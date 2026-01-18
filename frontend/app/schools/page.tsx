"use client";

import { useEffect, useState } from "react";
import { getSchools } from "../services/schoolService";
import SchoolCard from "../components/school/SchoolCard";
import Pagination from "../components/common/Pagination";

import ReviewForm from "@/app/components/review/ReviewForm";
import ReviewList from "@/app/components/review/ReviewList";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [search, setSearch] = useState("");

  const fetchSchools = async (pageNumber = page) => {
    const res = await getSchools({
      city: city || undefined,
      board: board || undefined,
      search: search || undefined,
      page: pageNumber,
      limit,
    });

    setSchools(res.data);
    setTotal(res.total);
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchSchools(1);
  }, []);

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
        </select>

        <button onClick={() => fetchSchools(1)}>Search</button>
      </div>

      {/* SCHOOL LIST */}
      {schools.map((school) => (
        <div key={school.id} style={{ marginBottom: 30 }}>
          <SchoolCard school={school} />

          {/* ⭐ RATING */}
          <p>
            ⭐ {school.rating || 0} ({school.review_count || 0} reviews)
          </p>

          {/* 📝 REVIEW FORM */}
          <ReviewForm slug={school.slug} />

          {/* 📋 REVIEW LIST */}
          <ReviewList slug={school.slug} />

          <hr />
        </div>
      ))}

      <Pagination
        total={total}
        page={page}
        limit={limit}
        onPageChange={(p) => fetchSchools(p)}
      />
    </div>
  );
}
