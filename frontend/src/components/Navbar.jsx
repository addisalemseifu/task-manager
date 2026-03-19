import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-amber-900 text-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold">Task Manager</h1>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}