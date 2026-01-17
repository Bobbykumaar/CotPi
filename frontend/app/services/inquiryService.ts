const API_BASE = "http://127.0.0.1:5000/api";

export async function getInquiries(schoolSlug?: string) {
  const url = schoolSlug
    ? `${API_BASE}/inquiries?school_slug=${schoolSlug}`
    : `${API_BASE}/inquiries`;

  const res = await fetch(url);
  return res.json();
}
