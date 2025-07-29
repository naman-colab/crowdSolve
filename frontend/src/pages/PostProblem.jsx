import React, { useState } from 'react';

export default function PostProblem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: ''
  });
  const finalData = {
    ...formData,
    userID: localStorage.getItem("userId") // force fresh read
  };
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/createProblem', { // ✅ UPDATED URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(finalData)
      });

      if (res.ok) {
        const data = await res.json();
        console.log('✅ Problem created:', data);
        setFormData({ title: '', description: '', location: '' });
        alert('Problem created successfully!');
      } else {
        console.error('❌ Failed to create problem:', res.status);
        alert('Failed to create problem');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a Problem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter problem title"
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
            placeholder="Describe the problem"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Where is the problem?"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Problem
        </button>
      </form>
    </div>
  );
}
