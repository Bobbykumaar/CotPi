"use client";

import { useState } from "react";

export default function InquiryForm({ slug }: { slug: string }) {
  const [form, setForm] = useState({
    parent_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

const submitInquiry = async () => {
  await fetch("http://127.0.0.1:5000/api/inquiries/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      school_slug: slug,
      ...form,
    }),
  });

  setSuccess(true);
};



  if (success) return <p>✅ Inquiry submitted successfully</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: 15 }}>
      <h3>Admission Inquiry</h3>

      <input
        placeholder="Parent Name"
        onChange={(e) =>
          setForm({ ...form, parent_name: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Message"
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <button onClick={submitInquiry}>Submit</button>
    </div>
  );
}
