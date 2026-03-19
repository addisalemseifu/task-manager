import express from "express";
import { getTasks, createTask, updateTask, deleteTask,getTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.put("/update/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;