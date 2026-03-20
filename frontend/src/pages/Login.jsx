// pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }
}, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/auth/login",
        user
      );

      // save token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");
      navigate("/");

    } catch (err) {
      toast.error("Login failed");
    }
  };
return (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-100 to-amber-200">
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/70 p-10 rounded-2xl shadow-xl flex flex-col gap-5 w-96 border border-white/40"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Welcome Back
      </h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
      />

      <button className="bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition font-medium shadow-md">
        Login
      </button>
      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <Link 
          to="/register" 
          className="text-amber-700 font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </form>

  </div>
);
}