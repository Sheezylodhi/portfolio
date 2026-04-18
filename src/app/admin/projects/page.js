"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProjects() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  // 🔹 Check admin auth
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/check");
        const json = await res.json();
        if (!json.authenticated) {
          router.replace("/admin/login");
        } else {
          setAuthenticated(true);
          fetchProjects();
        }
      } catch {
        router.replace("/admin/login");
      }
    })();
  }, [router]);

  // 🔹 Fetch projects from DB
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success) setProjects(json.result || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (json.success) {
      setAuthenticated(true);
      setUsername("");
      setPassword("");
      fetchProjects();
    } else {
      alert(json.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setProjects([]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    form.images.forEach((file) => formData.append("images", file));

    const res = await fetch("/api/projects", { method: "POST", body: formData });
    const json = await res.json();
    if (json.success) {
      setProjects((prev) => [...prev, json.newProject]);
      setForm({ title: "", description: "", link: "", images: [] });
      setImagePreviews([]);
    } else {
      alert(json.message || "Add failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert(json.message || "Delete failed");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  if (authenticated === null)
    return <div className="p-10 text-white bg-gray-900 min-h-screen">Checking...</div>;

  if (!authenticated)
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
        <div className="w-full max-w-md bg-gray-900 shadow-xl rounded-2xl p-8 border border-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">🔐 Admin Login</h1>
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

  return (
    <main className="p-6 min-h-screen bg-gray-950 text-gray-100">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">⚙️ Admin Panel - Projects</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Add Project Form */}
      <form
        onSubmit={handleAdd}
        className="w-full max-w-lg space-y-4 bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-800"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">➕ Add New Project</h2>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-700 bg-gray-800 p-3 w-full rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border border-gray-700 bg-gray-800 p-3 w-full rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Project Link"
          className="border border-gray-700 bg-gray-800 p-3 w-full rounded-lg text-white focus:ring-2 focus:ring-green-500"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-white"
        />
        <div className="flex gap-3 flex-wrap">
          {imagePreviews.map((src, idx) => (
            <div key={idx} className="relative">
              <img
                src={src}
                alt="preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md w-full">
          Add Project
        </button>
      </form>

      {/* Projects Grid */}
      <div className="w-full max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} handleDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}

// 🔹 Project Card with Slider
function ProjectCard({ project, handleDelete }) {
  const { images, title, description, link, _id } = project;
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="p-4 border border-gray-800 rounded-2xl shadow-xl bg-gray-900 flex flex-col hover:shadow-2xl transition">
      {images && images.length > 0 && (
        <div className="w-full h-40 relative rounded-lg overflow-hidden mb-3">
          <img
            src={images[current]}
            alt={`slide-${current}`}
            className="w-full h-40 object-contain transition-all duration-500"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600"
              >
                ›
              </button>
            </>
          )}

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  current === idx ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="font-bold text-lg text-white">{title}</h2>
      <p className="text-gray-400 text-sm mb-2">{description}</p>
      {link && (
        <a href={link} target="_blank" className="text-blue-400 underline text-sm mb-3">
          🔗 View Project
        </a>
      )}
      <button
        onClick={() => handleDelete(_id)}
        className="bg-red-600 text-white px-3 py-2 rounded-lg mt-auto hover:bg-red-700 shadow-md"
      >
        🗑 Delete
      </button>
    </div>
  );
}
