import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { taskService } from "../services/TaskService";
import { Task, CreateTask } from "../models/Task";

export const useTasks = () => {
    return useQuery<Task[], Error>({
        queryKey: ["tasks"],
        queryFn: () => taskService.fetchAll(),
    });
};

export const useTask = (id: number) => {
    return useQuery<Task, Error>({
        queryKey: ["task", id],
        queryFn: () => taskService.fetchById(id),
        enabled: !!id,
    });
};

export const useCreateTask = (): UseMutationResult<Task, Error, CreateTask> => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, CreateTask>({
    mutationFn: (data) => taskService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error al crear la Tarea:", error.message);
    },
  });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<Task, Error, { id: number; data: Partial<CreateTask> }>({
        mutationFn: ({id, data}) => taskService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"] });
        },
        onError: (error) => {
            console.error("Error al actualizar la tarea:", error.message);
        }
    });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => taskService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error al eliminar la Tarea:", error.message);
    },
  });
};