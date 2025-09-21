// src/pages/FarmerDashboard.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPaw, FaPrescriptionBottleAlt, FaBell } from "react-icons/fa";

function FarmerDashboard() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  // Dashboard cards
  const cards = [
    {
      title: "Register Animal",
      description: "Add new livestock to your farm records.",
      icon: <FaPaw size={30} />,
      action: () => navigate("/farmer/register-animal"),
      color: "bg-green-500",
    },
    {
      title: "Prescription",
      description: "View prescriptions issued by your vet.",
      icon: <FaPrescriptionBottleAlt size={30} />,
      action: () => navigate("/farmer/prescriptions"),
      color: "bg-blue-500",
    },
    {
      title: "Alerts",
      description: "Check withdrawal period alerts and warnings.",
      icon: <FaBell size={30} />,
      action: () => navigate("/farmer/alerts"),
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Welcome {user?.name || "Farmer"}!
        </h2>
        <p className="text-gray-700">
          Manage your farm, prescriptions, and alerts from here.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.action}
            className={`${card.color} text-white p-6 rounded-lg shadow cursor-pointer hover:scale-105 transition-transform duration-200`}
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerDashboard;
