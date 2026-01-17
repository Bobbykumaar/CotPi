import Link from "next/link";

export default function SchoolCard({ school }: any) {
  return (
    <Link href={`/schools/${school.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12 }}>
        <h3>{school.name}</h3>

        <p>
          {school.address
            ? `${school.address.city}, ${school.address.state}`
            : "Location not available"}
        </p>

        {school.board && (
          <p>
            Board: {Array.isArray(school.board) ? school.board.join(", ") : school.board}
          </p>
        )}

        {school.rating && <p>⭐ {school.rating}</p>}
      </div>
    </Link>
  );
}
