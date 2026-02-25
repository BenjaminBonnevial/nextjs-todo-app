// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    setTitle("");
    setDescription("");
    await fetchTasks();
    setLoading(false);
  };

  const toggleDone = async (task: Task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    await fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    await fetchTasks();
  };

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>📝 Todo App — Next.js + MongoDB + Prisma</h1>

      {/* Formulaire */}
      <div style={{ background: "#f5f5f5", padding: 20, borderRadius: 8, marginBottom: 32 }}>
        <h2 style={{ marginTop: 0 }}>Nouvelle tâche</h2>
        <input
          type="text"
          placeholder="Titre *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <input
          type="text"
          placeholder="Description (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <button
          onClick={addTask}
          disabled={loading}
          style={{ background: "#0070f3", color: "white", border: "none", padding: "10px 24px", borderRadius: 6, cursor: "pointer", fontSize: 16 }}
        >
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </div>

      {/* Liste */}
      <h2>Tâches ({tasks.length})</h2>
      {tasks.length === 0 && <p style={{ color: "#888" }}>Aucune tâche pour l'instant.</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: task.done ? "#e8f5e9" : "white",
            border: "1px solid #e0e0e0",
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task)}
                style={{ width: 18, height: 18, cursor: "pointer" }}
              />
              <strong style={{ textDecoration: task.done ? "line-through" : "none", fontSize: 16 }}>
                {task.title}
              </strong>
            </div>
            {task.description && (
              <p style={{ margin: "6px 0 0 28px", color: "#555", fontSize: 14 }}>{task.description}</p>
            )}
            <p style={{ margin: "4px 0 0 28px", color: "#aaa", fontSize: 12 }}>
              {new Date(task.createdAt).toLocaleString("fr-FR")}
            </p>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            style={{ background: "#ff4444", color: "white", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer", marginLeft: 12 }}
          >
            🗑
          </button>
        </div>
      ))}
    </main>
  );
}
