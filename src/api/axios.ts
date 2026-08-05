import axios from "axios";

export const api = axios.create({
  baseURL: "https://6a72e8964d741b02b1f7df16.mockapi.io/api/users",
  headers: { "Content-Type": "application/json" },
});

export default api;
