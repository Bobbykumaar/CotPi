import Link from "next/link";

export default function SchoolCard({ school }: any) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12 }}>
      <h3>
        <Link href={`/school/${school.slug}`}>
          {school.name}
        </Link>
      </h3>

      <p>
        {school.address
          ? `${school.address.city}, ${school.address.state}`
          : "Location not available"}
      </p>

      <p>Board: {school.board?.join(", ")}</p>
      <p>⭐ {school.rating}</p>
    </div>
  );
}
