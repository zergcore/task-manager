import axios, { AxiosRequestHeaders } from "axios";

const headers = {
  'Content-Type': 'application/json',
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers,
});


// Add interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers as AxiosRequestHeaders;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error)))
);

export default api;
