import Task from "../models/Task.js";

// 🟢 GET all tasks (protected)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 GET a task (protected)
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔵 CREATE task
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟡 UPDATE task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // make sure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = req.body.title || task.title;
    task.completed = req.body.completed ?? task.completed;

    const updated = await task.save();
    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔴 DELETE task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
