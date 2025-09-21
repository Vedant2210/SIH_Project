import React, { useState } from "react";
import api from "../api/axios"; // axios instance with baseURL

function VetPrescription() {
  const [form, setForm] = useState({
    animalId: "",
    drugName: "",
    dosage: "",
    frequency: "",
    reason: "",
    startDate: "",
    endDate: "",
    withdrawalPeriod: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/prescriptions", form); // backend route
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting prescription");
    }
  };

  return (
    <div>
      <h2>Fill Prescription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="animalId"
          placeholder="Animal ID"
          value={form.animalId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="drugName"
          placeholder="Drug Name"
          value={form.drugName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage"
          value={form.dosage}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="frequency"
          placeholder="Frequency"
          value={form.frequency}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="withdrawalPeriod"
          placeholder="Withdrawal Period (days)"
          value={form.withdrawalPeriod}
          onChange={handleChange}
        />
        <button type="submit">Submit Prescription</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default VetPrescription;
