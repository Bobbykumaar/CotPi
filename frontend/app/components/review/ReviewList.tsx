"use client";

import { useEffect, useState } from "react";

export default function ReviewList({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/reviews/${slug}`)
      .then((res) => res.json())
      .then(setReviews);
  }, [slug]);

  if (reviews.length === 0) return <p>No reviews yet</p>;

  return (
    <div>
      <h3>Parent Reviews</h3>

      {reviews.map((r) => (
        <div key={r._id} style={{ marginBottom: 10 }}>
          <strong>{r.parent_name}</strong> — ⭐ {r.rating}
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
