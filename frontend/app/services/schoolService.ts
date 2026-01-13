import axios from "axios";

const API = "http://127.0.0.1:5000/api/schools";

export const getSchools = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getSchoolBySlug = async (slug: string) => {
  const res = await axios.get(`${API}/${slug}`);
  return res.data;
};
