"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSchoolBySlug } from "../../services/schoolService";

import SchoolHeader from "../../components/school/SchoolHeader";
import AdmissionSection from "../../components/school/AdmissionSection";
import FeesSection from "../../components/school/FeesSection";

export default function SchoolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    getSchoolBySlug(slug)
      .then(setSchool)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p>Loading school details...</p>;
  if (!school) return <p>School not found</p>;

  return (
    <div>
      {/* ✅ Header */}
      <SchoolHeader school={school} />

      {/* ✅ Admission */}
      <AdmissionSection admission={school.admission} />

      {/* ✅ Fees */}
      <FeesSection fees={school.fees} />
    </div>
  );
}
