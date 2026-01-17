import InquiryClient from "./InquiryClient";

import SchoolHeader from "../../components/school/SchoolHeader";
import AdmissionSection from "../../components/school/AdmissionSection";
import FeesSection from "../../components/school/FeesSection";

/* 🔥 SERVER DATA FETCH */
async function getSchool(slug: string) {
  const res = await fetch(
    `http://127.0.0.1:5000/api/schools/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* 🔥 SEO META TAGS */
export async function generateMetadata({ params }: any) {
  const school = await getSchool(params.slug);

  if (!school) {
    return {
      title: "School not found | CotPi",
      description: "School information not available",
    };
  }

  return {
    title: `${school.name} (${school.board.join(", ")}) | Fees, Admission, Reviews`,
    description: `Admission details, fees, facilities, reviews & contact info for ${school.name}, ${school.address.city}.`,
    alternates: {
      canonical: `https://cotpi.com/schools/${school.slug}`,
    },
  };
}

/* 🔥 MAIN PAGE (SERVER COMPONENT) */
export default async function SchoolDetailPage({ params }: any) {
  const school = await getSchool(params.slug);

  if (!school) return <p>School not found</p>;

  return (
    <div>
      {/* ✅ Header */}
      <SchoolHeader school={school} />

      <p>
        📍 {school.address.city}, {school.address.state}
      </p>

      <hr />

      {/* ✅ Client Component (Inquiry Form) */}
      <InquiryClient slug={params.slug} />

      <hr />

      {/* ✅ Admission */}
      <AdmissionSection admission={school.admission} />

      {/* ✅ Fees */}
      <FeesSection fees={school.fees} />

      {/* ✅ Extra SEO Content */}
      <h2>About School</h2>
      <p>Established: {school.established_year}</p>
      <p>Board: {school.board.join(", ")}</p>
      <p>
        Classes: {school.classes_offered.from} –{" "}
        {school.classes_offered.to}
      </p>

      <h2>Infrastructure</h2>
      <ul>
        {school.infrastructure.academic.map((i: string) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
