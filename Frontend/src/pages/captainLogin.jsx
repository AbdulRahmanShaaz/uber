import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Uber from "../assets/uber.png";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/captains/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Captain login failed");
      }

      localStorage.setItem("uberCaptainToken", data.token);
      navigate("/");
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

        <h1 className="mb-6 text-3xl font-semibold">Driver login</h1>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-xl bg-[#eeeeee] px-4 text-lg outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-xl bg-black text-lg font-medium text-white disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account? <Link to="/captain-signup" className="font-semibold text-black">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainLogin;