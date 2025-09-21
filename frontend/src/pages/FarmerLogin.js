import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function FarmerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.user.role !== "farmer") {
        setMessage("Access denied! Only farmers can log in here.");
        return;
      }

      setMessage(res.data.message);
      console.log("Farmer logged in:", res.data.user);

      navigate("/farmer/dashboard", { state: { user: res.data.user } });
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        {/* Logo / Branding */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold shadow-md">
            🌱
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Farmer Login
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Access your AMU Monitoring Dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            className="bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 active:bg-green-700 transition transform hover:scale-[1.02] shadow-md"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Messages */}
        {message && (
          <p className="text-center mt-4 text-red-500 font-medium">{message}</p>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-600 font-semibold hover:underline">
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
}

export default FarmerLogin;
