import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Posts API
export const postsAPI = {
  getAll: () => api.get("/posts/"),
  getById: (id) => api.get(`/posts/${id}/`),
  create: (data) => api.post("/posts/", data),
  update: (id, data) => api.put(`/posts/${id}/`, data),
  delete: (id) => api.delete(`/posts/${id}/`),
};

// Authors API
export const authorsAPI = {
  getAll: () => api.get("/authors/"),
  getById: (id) => api.get(`/authors/${id}/`),
  create: (data) => api.post("/authors/", data),
  update: (id, data) => api.put(`/authors/${id}/`, data),
  delete: (id) => api.delete(`/authors/${id}/`),
};

export default api;
