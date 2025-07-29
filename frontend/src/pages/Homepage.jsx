import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function HomePage() {
  const [problems, setProblems] = useState([]);
  const [showMyProblems, setShowMyProblems] = useState(false); // ✅ toggle state

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await fetch("http://localhost:5000/api/problems");
      const data = await res.json();
      setProblems(data);
    };

    fetchProblems();
  }, []);

  const myProblems = problems.filter(
    (problem) => problem.createdBy === userId
  );

  const displayedProblems = showMyProblems ? myProblems : problems;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {showMyProblems ? "My Problems" : "All Problems"}
        </h2>
        <button
          onClick={() => setShowMyProblems(!showMyProblems)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showMyProblems ? "Show All Problems" : "Show My Problems"}
        </button>
      </div>

      {displayedProblems.length > 0 ? (
        displayedProblems.map((problem) => (
          <Card key={problem._id} problem={problem} />
        ))
      ) : (
        <p className="text-gray-500">
          {showMyProblems
            ? "You have not posted any problems yet."
            : "No problems found."}
        </p>
      )}
    </div>
  );
}
