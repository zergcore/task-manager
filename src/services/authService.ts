import api from "./api";
import { LoginCredentials, RegisterData } from "./types";

export const register = async (data: RegisterData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
