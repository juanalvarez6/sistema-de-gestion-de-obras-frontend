import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { projectService } from "../services/ProjectService";
import { Project, CreateProject } from "../models/Project";

// Obtener todos los proyectos con manejo de errores
export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: () => projectService.fetchAll(),
  });
};

// Obtener un proyecto por ID
export const useProject = (id: number) => {
  return useQuery<Project, Error>({
    queryKey: ["project", id],
    queryFn: () => projectService.fetchById(id),
    enabled: !!id, // Solo ejecutar la consulta si id es verdadero
  });
};

// Crear un nuevo proyecto con manejo de errores
export const useCreateProject = (): UseMutationResult<Project, Error, CreateProject> => {
  const queryClient = useQueryClient();
  return useMutation<Project, Error, CreateProject>({
    mutationFn: (data) => projectService.create(data),
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
    mutationFn: ({ id, data }) => projectService.update(id, data),
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
    mutationFn: (id) => projectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error("Error al eliminar el proyecto:", error.message);
    },
  });
};