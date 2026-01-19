"use client";

type Props = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ total, page, limit, onPageChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" style={{ display: "flex", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            aria-current={page === pageNumber ? "page" : undefined}
            style={{
              fontWeight: page === pageNumber ? "bold" : "normal",
              color: page === pageNumber ? "#fff" : "#000",
              backgroundColor: page === pageNumber ? "#0070f3" : "transparent",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
}
