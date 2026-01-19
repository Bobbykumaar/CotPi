"use client";

import { useEffect, useState } from "react";
import { getSchools } from "../services/schoolService";
import SchoolCard from "../components/school/SchoolCard";
import Pagination from "../components/common/Pagination";

interface School {
  _id: string;
  name: string;
  city?: string;
  board?: string;
  rating?: number;
  review_count?: number;
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [search, setSearch] = useState("");

  const fetchSchools = async (p = page) => {
    setLoading(true);
    try {
      const res = await getSchools({
        page: p,
        limit: 10,
        city: city || undefined,
        board: board || undefined,
        search: search || undefined,
      });

      setSchools(res.data);
      setTotalPages(res.totalPages);
      setPage(p);
    } catch (error) {
      console.error("Failed to fetch schools", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => fetchSchools(1), 500);
    return () => clearTimeout(timeout);
  }, [search, city, board]);

  return (
    <div>
      <h1>Search Schools</h1>

      {/* FILTER BAR */}
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
        <button onClick={() => fetchSchools(1)} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <hr />

      {/* SCHOOL LIST */}
      {loading && <p>Loading schools...</p>}
      {!loading && schools.length === 0 && <p>No schools found.</p>}
      {!loading &&
        schools.map((school) => <SchoolCard key={school._id} school={school} />)}

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={(p) => fetchSchools(p)} />
      )}
    </div>
  );
}
