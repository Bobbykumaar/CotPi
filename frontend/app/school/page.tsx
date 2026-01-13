"use client";

import { useEffect, useState } from "react";
import { getSchoolBySlug } from "../../services/schoolService";

export default function SchoolDetailPage({ params }: any) {
  const { slug } = params;
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSchoolBySlug(slug)
      .then(setSchool)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading school details...</p>;
  if (!school) return <p>School not found</p>;

  return (
    <div>
      <h1>{school.name}</h1>

      <p>
        📍 {school.address?.city}, {school.address?.state}
      </p>

      <p>🏫 Board: {school.board?.join(", ")}</p>
      <p>⭐ Rating: {school.rating}</p>

      <hr />

      <h2>Admission</h2>
      <p>Mode: {school.admission?.mode?.join(", ")}</p>
      <p>Criteria: {school.admission?.criteria}</p>

      <hr />

      <h2>Fees</h2>
      <p>Admission Fee: ₹{school.fees?.one_time?.admission_fee}</p>
      <p>Security Deposit: ₹{school.fees?.one_time?.security_deposit}</p>

      <hr />

      <h2>Infrastructure</h2>
      <ul>
        {school.infrastructure?.academic?.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <hr />

      <h2>Events</h2>
      <ul>
        {school.events?.competitions?.map((e: string) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}
