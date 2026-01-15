"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSchools } from "../services/schoolService";

export default function SchoolsPage() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getSchools().then(setSchools);
  }, []);

  return (
    <div>
      <h1>Schools</h1>
      {schools.map((s: any) => (
        <div key={s._id}>
          <h3>
            <Link href={`/school/${s.slug}`}>
              {s.name}
            </Link>
          </h3>
          <p>{s.address.city}</p>
        </div>
      ))}
    </div>
  );
}
