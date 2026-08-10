import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Uber from "../assets/uber.png";

const UserSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("uberUserToken", data.token);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 py-5">
      <div className="mx-auto max-w-[420px]">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-2xl" aria-label="Go back">←</Link>
          <img src={Uber} alt="Uber" className="w-14" />
          <div className="w-6"></div>
        </div>

        <h1 className="mb-6 text-3xl font-semibold">Create your account</h1>

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
            required
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-14 w-full rounded-xl bg-black text-lg font-medium text-white disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="font-semibold text-black">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;