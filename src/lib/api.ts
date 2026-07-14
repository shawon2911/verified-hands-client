import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all workers
export const getWorkers = async () => {
  const response = await api.get("/api/workers");
  return response.data;
};

// Get single worker by ID
export const getWorkerById = async (id: string) => {
  const response = await api.get(`/api/workers/${id}`);
  return response.data;
};