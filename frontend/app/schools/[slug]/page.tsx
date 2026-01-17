"use client";

import InquiryForm from "@/app/components/inquiry/InquiryForm";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SchoolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://127.0.0.1:5000/api/schools/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setSchool(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading school...</p>;
  if (!school) return <p>School not found</p>;

  return (
    <div>
      <h1>{school.name}</h1>
      <hr />
      <hr />
        <InquiryForm slug={slug} />


<h2>About School</h2>
<p>Established: {school.established_year}</p>
<p>Board: {school.board.join(", ")}</p>
<p>
  Classes: {school.classes_offered?.from} –{" "}
  {school.classes_offered?.to}
</p>

<hr />

<h2>Admission & Fees</h2>
<p>Admission Mode: {school.admission?.mode?.join(", ")}</p>
<p>Registration Fee: ₹{school.admission?.registration_fee}</p>

<hr />

<h2>Infrastructure</h2>
<ul>
  {school.infrastructure?.academic?.map((item: string) => (
    <li key={item}>{item}</li>
  ))}
</ul>

      <p>
        {school.address?.city}, {school.address?.state}
      </p>
    </div>
  );
  
 
 
}
