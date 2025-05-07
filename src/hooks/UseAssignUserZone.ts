import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { assignUserZoneService } from "../services/AssignUserZoneService";
import { AssignUserZone, CreateAssignUserZone } from "../models/AssignUserZone";

export const useAssignUserZones = () => {
    return useQuery<AssignUserZone[], Error>({
        queryKey: ["assignUserZones"],
        queryFn: () => assignUserZoneService.fetchAll(),
    });
};

export const useAssignUserZone = (id: number) => {
    return useQuery<AssignUserZone, Error>({
        queryKey: ["assignUserZone", id],
        queryFn: () => assignUserZoneService.fetchById(id),
        enabled: !!id,
    });
};

export const useCreateAssignUserZone = (): UseMutationResult<AssignUserZone, Error, CreateAssignUserZone> => {
  const queryClient = useQueryClient();
  return useMutation<AssignUserZone, Error, CreateAssignUserZone>({
    mutationFn: (data) => assignUserZoneService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignUserZones"] });
    },
    onError: (error) => {
      console.error("Error al agregar dato de asiganación de zona:", error.message);
    },
  });
};

export const useUpdateAssignUserZone = () => {
    const queryClient = useQueryClient();
    return useMutation<AssignUserZone, Error, { id: number; data: Partial<CreateAssignUserZone> }>({
        mutationFn: ({id, data}) => assignUserZoneService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["assignUserZones"] });
        },
        onError: (error) => {
            console.error("Error al actualizar dato de asiganación de zona:", error.message);
        }
    });
};

export const useDeleteAssignUserZone = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => assignUserZoneService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignUserZones"] });
    },
    onError: (error) => {
      console.error("Error al eliminar dato de asiganación de zona:", error.message);
    },
  });
};