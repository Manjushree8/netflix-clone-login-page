import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        🎉 You're signed in
      </h1>

      <p className="text-lg text-gray-400 mb-10 text-center max-w-md">
        Welcome back! Explore your favorite shows and movies anytime.
      </p>

      <button
        onClick={handleLogout}
        className="bg-[#e50914] hover:bg-[#f6121d] text-white font-semibold px-6 py-3 rounded shadow transition"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
