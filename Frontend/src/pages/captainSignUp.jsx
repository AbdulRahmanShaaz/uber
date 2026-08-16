import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Uber from "../assets/uber.png";

const CaptainSignUp = () => {
  const navigate = useNavigate();
  const { loginCaptain } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    color: "",
    plate: "",
    capacity: "4",
    vehicleType: "car",
    latitude: "12.9716",
    longitude: "77.5946",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/captains/register",
        {
          fullName: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          email: formData.email,
          password: formData.password,
          vehicle: {
            color: formData.color,
            plate: formData.plate,
            capacity: Number(formData.capacity),
            vehicleType: formData.vehicleType,
            location: {
              latitude: Number(formData.latitude),
              longitude: Number(formData.longitude),
            },
          },
        }
      );

      loginCaptain(response.data);
      navigate("/captain-login");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 py-5">
      <div className="mx-auto max-w-[480px]">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-2xl" aria-label="Go back">←</Link>
          <img src={Uber} alt="Uber" className="w-14" />
          <div className="w-6"></div>
        </div>

        <h1 className="mb-6 text-3xl font-semibold">Become a driver</h1>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="h-14 w-full rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="h-14 w-full rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
            minLength={6}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="color"
              type="text"
              placeholder="Vehicle color"
              value={formData.color}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
            <input
              name="plate"
              type="text"
              placeholder="Plate number"
              value={formData.plate}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="capacity"
              type="number"
              min="1"
              placeholder="Seats"
              value={formData.capacity}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
            >
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="truck">Truck</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="latitude"
              type="number"
              step="any"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
            <input
              name="longitude"
              type="number"
              step="any"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="h-14 rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-xl bg-black text-lg font-medium text-white disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered? <Link to="/captain-login" className="font-semibold text-black">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;