import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">CrowdSolve</Link>
      </h1>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>

        {/* ✅ Show Post Problem only if logged in */}
        {token && (
          <Link to="/post-problem" className="hover:underline">
            Post Problem
          </Link>
        )}

        {token ? (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-red-500 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
