// src/components/Card.jsx
import React, { useEffect, useState } from "react";

export default function Card({ problem }) {
  return (
    <div className="border rounded shadow p-4 mb-4">
      {problem.imageUrl && (
        <img src={problem.imageUrl} alt="Problem" className="w-full h-48 object-cover mb-2 rounded" />
      )}
      <h3 className="text-lg font-bold mb-1">{problem.location}</h3>
      <p>{problem.description}</p>
    </div>
  );
}
