"use client";

import { useEffect, useState } from "react";
import { getSchools } from "../services/schoolService";
import SchoolCard from "../components/school/SchoolCard";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);

  const fetchSchools = async () => {
    const res = await getSchools({
      city: city || undefined,
      board: board || undefined,
      search: search || undefined,
      page,
      limit,
    });

    // backend returns { data, total, page, limit }
    setSchools(res.data);
    setTotal(res.total);
  };

  // initial load + page change
  useEffect(() => {
    fetchSchools();
  }, [page]);

  // when filters change → reset to page 1
  const applyFilters = () => {
    setPage(1);
    fetchSchools();
  };

  const totalPages = Math.ceil(total / limit);

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

        <button onClick={applyFilters}>Search</button>
      </div>

      {/* 📋 RESULTS */}
      {schools.length === 0 && <p>No schools found</p>}

      {schools.map((s) => (
        <SchoolCard key={s.id} school={s} />
      ))}

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
