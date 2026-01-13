"use client";
import { useEffect, useState } from "react";
import { getSchools } from "../services/schoolService";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSchools()
      .then((data) => setSchools(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading schools...</p>;

  if (!schools.length) return <p>No schools found</p>;

  return (
    <div>
      <h1>Schools</h1>

      {schools.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>
            {s.address
              ? `${s.address.city}, ${s.address.state}`
              : "Location not available"}
          </p>
        </div>
      ))}
    </div>
  );
}
