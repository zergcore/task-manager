import api from "./api";
import { Task, TaskData } from "./types";

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/tasks");
  return response.data;
};

export const createTask = async (taskData: TaskData): Promise<Task> => {
  const response = await api.post<Task>("/tasks", taskData);
  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: TaskData
): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
  return id;
};
