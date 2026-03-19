import { useEffect, useState } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return toast.error("Enter a task");

    try {
      const res = await API.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
      toast.success("Task added");
    } catch {
      toast.error("Error creating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await API.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 to-amber-200 min-h-screen">
      <Navbar />

      <div className="max-w-xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] mx-auto mt-12 backdrop-blur-md bg-white/70 p-6 sm:p-8 rounded-2xl shadow-xl border border-white/40">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
          Your Tasks
        </h2>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition bg-white/80"
          />
          <button
            onClick={createTask}
            className="bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition shadow-md font-medium"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-3">
  {tasks.map((task) => (
    <div
      key={task._id}
      className="
        flex flex-col 
        sm:flex-row 
        sm:justify-between 
        sm:items-center 
        bg-white/80 
        p-4 
        rounded-xl 
        shadow-sm 
        border 
        border-gray-200 
        gap-4 
        w-full
      "
    >
      {/* Task Title */}
      <span
        className={`
          text-lg 
          break-words 
          w-full 
          sm:w-auto
          ${task.completed ? "line-through text-gray-500" : "text-gray-800"}
        `}
      >
        {task.title}
      </span>

      {/* Buttons */}
      <div
        className="
          flex 
          gap-6 
          justify-end 
          sm:justify-center 
          w-full 
          sm:w-auto
        "
      >
        <button
          onClick={() => navigate(`/edit-task/${task._id}`)}
          className="hover:scale-110 transition"
        >
          <FaEdit className="text-blue-600" />
        </button>

        <button
          onClick={() => toggleComplete(task)}
          className="hover:scale-110 transition"
        >
          <FaCheck
            className={`${
              task.completed ? "text-gray-400" : "text-green-600"
            }`}
          />
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="hover:scale-110 transition"
        >
          <FaTrash className="text-red-600" />
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}