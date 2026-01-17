"use client";

import { useEffect, useState } from "react";
import { getInquiries } from "@/app/services/inquiryService";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [slug, setSlug] = useState("");

  const loadInquiries = async () => {
    const data = await getInquiries(slug || undefined);
    setInquiries(data);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📩 School Inquiries</h1>

      <input
        placeholder="Filter by school slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <button onClick={loadInquiries}>Filter</button>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>School</th>
            <th>Parent</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((i) => (
            <tr key={i._id}>
              <td>{i.school_slug}</td>
              <td>{i.parent_name}</td>
              <td>{i.phone}</td>
              <td>{i.email}</td>
              <td>{i.message}</td>
              <td>{new Date(i.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
