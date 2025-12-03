"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (json.success) {
      router.replace("/admin/projects"); // ✅ login ke baad direct projects page
    } else {
      alert(json.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
      <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          🔐 Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin username"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            required
          />
          <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 shadow-lg">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
