import axios from "axios";

const API = "http://127.0.0.1:5000/api/schools";

// ✅ UPDATED: supports search + filters
export const getSchools = async (params?: {
  city?: string;
  board?: string;
  search?: string;
}) => {
  const res = await axios.get(API, { params });
  return res.data;
};

// ❌ NO CHANGE here
export const getSchoolBySlug = async (slug: string) => {
  const res = await axios.get(`${API}/${slug}`);
  return res.data;
};
