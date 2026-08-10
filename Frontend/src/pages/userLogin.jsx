import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Uber from "../assets/uber.png";
import Apple from "../assets/apple.png";

const UserLogin = () => {
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
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("uberUserToken", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="w-full max-w-[375px] mx-auto px-5 py-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-2xl" aria-label="Go back">
            ←
          </Link>

          <img src={Uber} alt="Uber" className="w-14" />
          <div className="w-6"></div>
        </div>

        <h1 className="text-[25px] leading-tight font-normal mb-5">
          Enter your email and password
        </h1>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 bg-[#eeeeee] rounded-xl px-4 text-lg outline-none mb-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 bg-[#eeeeee] rounded-xl px-4 text-lg outline-none mb-4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-black text-white rounded-xl text-lg font-medium disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-gray-500">or</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>

        <button className="w-full h-14 bg-[#eeeeee] rounded-xl text-lg font-medium flex items-center justify-center gap-3 mb-3">
          <span className="text-xl">G</span>
          Continue with Google
        </button>

        <button className="w-full h-14 bg-[#eeeeee] rounded-xl text-lg font-medium flex items-center justify-center gap-3 mb-3">
          <img src={Apple} alt="Apple" className="w-5 h-5" />
          Continue with Apple
        </button>

        <button className="w-full h-14 bg-[#eeeeee] rounded-xl text-lg font-medium flex items-center justify-center gap-3">
          <span className="text-xl">f</span>
          Continue with Facebook
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account? <Link to="/signup" className="font-semibold text-black">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;