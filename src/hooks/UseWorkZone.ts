import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { workZoneService } from "../services/WorkZoneService";
import { WorkZone, CreateWorkZone } from "../models/WorkZone";

// Obtener todas las zonas de trabajo
export const useWorkZones = () => {
  return useQuery<WorkZone[], Error>({
    queryKey: ["workZones"],
    queryFn: () => workZoneService.fetchAll(),
  });
};

// Obtener una zona de trabajo por ID
export const useWorkZone = (id: number) => {
  return useQuery<WorkZone, Error>({
    queryKey: ["workZone", id],
    queryFn: () => workZoneService.fetchById(id),
    enabled: !!id,
  });
};

// Crear una nueva zona de trabajo
export const useCreateWorkZone = (): UseMutationResult<WorkZone, Error, CreateWorkZone> => {
  const queryClient = useQueryClient();
  return useMutation<WorkZone, Error, CreateWorkZone>({
    mutationFn: (data) => workZoneService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workZones"] });
    },
    onError: (error) => {
      console.error("Error al crear la zona:", error.message);
    },
  });
};

// Actualizar una zona de trabajo
export const useUpdateWorkZone = () => {
  const queryClient = useQueryClient();
  return useMutation<WorkZone, Error, { id: number; data: Partial<CreateWorkZone> }>({
    mutationFn: ({ id, data }) => workZoneService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workZones"] });
    },
    onError: (error) => {
      console.error("Error al actualizar la zona:", error.message);
    },
  });
};

// Eliminar una zona de trabajo
export const useDeleteWorkZone = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => workZoneService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workZones"] });
    },
    onError: (error) => {
      console.error("Error al eliminar la zona:", error.message);
    },
  });
};