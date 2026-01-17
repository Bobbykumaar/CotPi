"use client";

import { useState } from "react";

export default function AddSchoolPage() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    board: "",
    email: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitSchool = async () => {
    setLoading(true);

    await fetch("http://127.0.0.1:5000/api/pending-schools/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // ✅ RESET FORM AFTER SUBMIT
    setForm({
      name: "",
      city: "",
      state: "",
      board: "",
      email: "",
      phone: "",
    });

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h1>Add Your School</h1>

      {success && (
        <p style={{ color: "green" }}>
           School submitted! Our team will verify it shortly.
        </p>
      )}

      <input
        name="name"
        placeholder="School Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />

      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
      />

      <input
        name="board"
        placeholder="Board (CBSE / ICSE)"
        value={form.board}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Official Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Contact Number"
        value={form.phone}
        onChange={handleChange}
      />

      <button onClick={submitSchool} disabled={loading}>
        {loading ? "Submitting..." : "Submit School"}
      </button>
    </div>
  );
}
