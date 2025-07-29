// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // optional: for error messages

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const [currentUserId,setcurrentuserID]=useState()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear any old errors
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // only needed if your backend sets HttpOnly cookies
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login success:", data);
// 6888cf48114b4ba9471670896888cf48114b4ba947167089
setcurrentuserID(data.result?._id)
        // ✅ Store JWT in localStorage
         localStorage.setItem("userId", data.result?._id); 
        localStorage.setItem("token", data.token);
        

        // ✅ Redirect to home page without reload
        navigate("/");
      } else {
        const errorData = await res.json();
        console.error("Login failed:", errorData.message);
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
