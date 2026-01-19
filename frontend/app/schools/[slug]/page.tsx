import InquiryForm from "@/app/components/inquiry/InquiryForm";
import ReviewForm from "@/app/components/review/ReviewForm";
import ReviewList from "@/app/components/review/ReviewList";

type Props = {
  params: Promise<{ slug: string }>;
};

/* 🔥 SEO METADATA */
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    `http://127.0.0.1:5000/api/schools/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "School Not Found | CotPi",
    };
  }

  const school = await res.json();

  return {
    title: `${school.name} (${school.address.city}) – Fees, Reviews & Admission | CotPi`,
    description: `Check admission details, fees, reviews, facilities and contact information of ${school.name}, ${school.address.city}.`,
  };
}

/* 🔥 SERVER COMPONENT */
export default async function SchoolDetailPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    `http://127.0.0.1:5000/api/schools/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p>School not found</p>;
  }

  const school = await res.json();

  return (
    <div>
      <h1>{school.name}</h1>

      <p>
        {school.address.city}, {school.address.state}
      </p>

      <p>
        ⭐ {school.rating || 0} ({school.review_count || 0} reviews)
      </p>

      <hr />

      <h2>About {school.name}</h2>
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

      <hr />

      {/* CLIENT COMPONENTS */}
      <InquiryForm slug={slug} />
      <ReviewForm slug={slug} />
      <ReviewList slug={slug} />
    </div>
  );
}
