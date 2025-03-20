import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types/error";
import { Task, TaskData } from "../services/types";
import { createTask, deleteTask, updateTask } from "../services/taskService";

const useCreateTaskMutation = (): UseMutationResult<Task, AxiosError<ErrorResponse, any>, TaskData, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

  const useDeleteTaskMutation = (): UseMutationResult<string, AxiosError<ErrorResponse, any>, string, unknown> => {
    const queryClient = useQueryClient();
    return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

const useUpdateMutation = ({onSuccess, onError}: {onSuccess: () =>void, onError: () => void}): UseMutationResult<Task, Error, { id: string; taskData: Partial<Task>; }, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, taskData }: { id: string; taskData: Partial<Task> }) => updateTask(id, taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onSuccess();
    },
    onError
  });}

export {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateMutation,
}