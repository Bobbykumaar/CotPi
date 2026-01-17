"use client";
import { useState } from "react";

export default function AddSchoolPage() {
  const [form, setForm] = useState({
    school_name: "",
    city: "",
    board: "",
    contact_person: "",
    phone: "",
    email: "",
  });

  const submit = async () => {
    await fetch("http://127.0.0.1:5000/api/pending-schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        board: [form.board],
      }),
    });

    alert("School submitted for review");
  };

  return (
    <div>
      <h1>Add Your School</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key.replace("_", " ")}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
}
