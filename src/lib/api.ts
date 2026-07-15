import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true, 
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


export const getJobs = async () => {
  const response = await api.get("/api/jobs");
  return response.data;
};

export const getEmployerJobs = async (employerId: string) => {
  const response = await api.get(`/api/jobs/employer/${employerId}`);
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await api.get(`/api/jobs/${id}`);
  return response.data;
};