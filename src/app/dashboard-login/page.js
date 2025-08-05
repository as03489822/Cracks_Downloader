'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import Loginimage from '../../../public/Image123.jpg';

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://eb-project-backend-production.up.railway.app/api/v0/user/loginUser",
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.Token);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#AC72A1] via-[#FBD9FA] to-[#070E2A] flex items-center justify-center px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl items-center">
        
        {/* Left - IMAGE */}
        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="w-full max-w-md sm:h-[350px] md:h-[400px] lg:h-[450px] relative rounded-[30px] overflow-hidden shadow-xl">
            <Image
              src={Loginimage}
              alt="Login Visual"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right - LOGIN FORM */}
        <div className="w-full lg:w-1/2 flex justify-start">
          <div className="w-full max-w-md rounded-r-[30px] p-6 sm:p-8 lg:p-10 bg-white/10 backdrop-blur-md flex flex-col items-center justify-center shadow-xl">
            
            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-b from-[#AC72A1] to-[#070E2A] text-transparent bg-clip-text mb-8">
              Login
            </h2>

            {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

            <div className="w-full relative mb-6">
              <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-3 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <div className="w-full relative mb-6">
              <FaLock className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-lg" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-b border-black placeholder-black pl-2 pr-10 py-3 focus:outline-none text-sm sm:text-base"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-t from-[#070E2A] to-[#AC72A1] py-3 rounded-full hover:opacity-90 transition-all duration-300 text-white font-medium text-sm sm:text-base"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-6 text-sm sm:text-base text-[#070E2A] gap-2 sm:gap-0">
              <Link href="/signup" className="hover:underline">Create an account</Link>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
