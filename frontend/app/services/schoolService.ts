import axios from "axios";

const API = "http://127.0.0.1:5000/api/schools";

// ✅ UPDATED: supports search + filters
type GetSchoolsParams = {
  city?: string;
  board?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export const getSchools = async (params: GetSchoolsParams) => {
  const query = new URLSearchParams();

  if (params.city) query.append("city", params.city);
  if (params.board) query.append("board", params.board);
  if (params.search) query.append("search", params.search);
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());

  const res = await fetch(
    `http://127.0.0.1:5000/api/schools?${query.toString()}`
  );

  return res.json();
};

