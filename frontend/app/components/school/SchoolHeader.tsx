export default function SchoolHeader({ school }: any) {
  return (
    <div>
      <h1>{school.name}</h1>
      <p>
        📍 {school.address?.city}, {school.address?.state}
      </p>
      <p>🏫 {school.board?.join(", ")}</p>
      <p>⭐ {school.rating}</p>
      <hr />
    </div>
  );
}
