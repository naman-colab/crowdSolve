import React, { useState } from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
export default function PostProblemPage() {

      console.log('Decoded JWT:', decoded);
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    imageUrl: "",
    userID:localStorage.getItem("userId")
  });
console.log(formData);
console.log(localStorage.getItem("userId"));
const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      userID:localStorage.getItem("userId"),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(e);

    const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
console.log(decoded);
console.log(formData);

    const res = await fetch("http://localhost:5000/api/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Problem posted successfully!");
          navigate("/");
    } else {
      alert("Failed to post problem.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4" onClick={handleSubmit}>Post a Problem</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Post Problem
        </button>
      </form>
    </div>
  );
}
