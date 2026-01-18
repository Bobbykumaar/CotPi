"use client";

import { useState } from "react";

export default function ReviewForm({ slug }: { slug: string }) {
  const [form, setForm] = useState({
    parent_name: "",
    rating: 5,
    comment: "",
  });

  const [success, setSuccess] = useState(false);

  const submitReview = async () => {
    await fetch("http://127.0.0.1:5000/api/reviews/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school_slug: slug,
        ...form,
      }),
    });

    setForm({ parent_name: "", rating: 5, comment: "" });
    setSuccess(true);
  };

  if (success) return <p>✅ Review submitted</p>;

  return (
    <div style={{ border: "1px solid #ddd", padding: 15 }}>
      <h3>Write a Review</h3>

      <input
        placeholder="Your Name"
        value={form.parent_name}
        onChange={(e) =>
          setForm({ ...form, parent_name: e.target.value })
        }
      />

      <select
        value={form.rating}
        onChange={(e) =>
          setForm({ ...form, rating: Number(e.target.value) })
        }
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            ⭐ {r}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Your experience"
        value={form.comment}
        onChange={(e) =>
          setForm({ ...form, comment: e.target.value })
        }
      />

      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
}
