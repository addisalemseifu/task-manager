import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";

export const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  // 🔥 fetch task
  useEffect(() => {
    const fetchTask = async () => {
      const res = await API.get(
        `/tasks/${id}`
      );
      setTask(res.data);
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        `/tasks/update/${id}`,
        task
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-100 to-amber-200">
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-xl flex flex-col gap-5 w-96 border border-white/40"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Edit Task
      </h2>

      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-3 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
      />

      <button className="bg-amber-700 text-white p-3 rounded-lg hover:bg-amber-800 transition font-medium shadow-md">
        Update Task
      </button>
    </form>
  </div>
);
};