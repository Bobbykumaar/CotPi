const API = "http://127.0.0.1:5000/api/schools";

export async function getSchools(params: {
  page?: number;
  limit?: number;
  city?: string;
  board?: string;
  search?: string;
}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, value.toString());
    }
  });

  const res = await fetch(`${API}?${query.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch schools");
  }

  return res.json();
}
