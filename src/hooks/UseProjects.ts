import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/ProjectService";
import { Project, CreateProject } from "../models/Project";

// Obtener todos los proyectos con manejo de errores
export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

// Obtener un proyecto por ID
export const useProject = (id: number) => {
  return useQuery<Project, Error>({
    queryKey: ["project", id],
    queryFn: () => fetchProjectById(id),
    enabled: !!id,
  });
};

// Crear un nuevo proyecto con manejo de errores
export const useCreateProject = (): UseMutationResult<Project, Error, CreateProject> => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, CreateProject>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Error al crear el proyecto:", error.message);
    },
  });
};

// Actualizar un proyecto
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, { id: number; data: Partial<CreateProject> }>({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Error al actualizar el proyecto:", error.message);
    },
  });
};

// Eliminar un proyecto
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Error al eliminar el proyecto:", error.message);
    },
  });
};
