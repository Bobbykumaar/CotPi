"use client";

import { useEffect, useState } from "react";
import { getSchools } from "../services/schoolService";
import SchoolCard from "../components/school/SchoolCard";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [search, setSearch] = useState("");

  const fetchSchools = async () => {
    const data = await getSchools({
      city: city || undefined,
      board: board || undefined,
      search: search || undefined,
    });
    setSchools(data);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div>
      <h1>Search Schools</h1>

      {/* 🔍 FILTER BAR */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select value={board} onChange={(e) => setBoard(e.target.value)}>
          <option value="">All Boards</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="State Board">State Board</option>
        </select>

        <button onClick={fetchSchools}>Search</button>
      </div>

      {/* 📋 RESULTS */}
      {schools.length === 0 && <p>No schools found</p>}

      {schools.map((s) => (
        <SchoolCard key={s.id} school={s} />
      ))}
    </div>
  );
}
