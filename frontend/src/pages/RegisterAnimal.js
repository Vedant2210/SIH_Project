import React, { useState } from "react";
import api from "../api/axios";
import { useLocation } from "react-router-dom";

function RegisterAnimal() {
  const location = useLocation();
  const user = location.state?.user; // get logged-in farmer
  const [form, setForm] = useState({
    tagId: "",
    species: "",
    age: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/animals/register", { ...form, userId: user._id });
      setMessage(res.data.message);
      setForm({ tagId: "", species: "", age: "" }); // reset form
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Register Animal</h2>
        <p className="text-center text-gray-600 mb-6">
          Add a new animal to your farm records.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="tagId"
            placeholder="Animal Tag ID"
            value={form.tagId}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="species"
            placeholder="Species (Cow, Buffalo, Goat, etc.)"
            value={form.species}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age (in years)"
            value={form.age}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {message && <p className="text-center mt-4 text-green-600 font-medium">{message}</p>}
      </div>
    </div>
  );
}

export default RegisterAnimal;
