import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { assignUserZoneService } from "../services/AssignUserZoneService";
import { AssignUserZone, CreateAssignUserZone } from "../models/AssignUserZone";
import { useAuth } from "../context/AuthProvider";

export const useAssignUserZones = () => {
  const { token } = useAuth();
  return useQuery<AssignUserZone[], Error>({
    queryKey: ["assignUserZones"],
    queryFn: () => assignUserZoneService.fetchAll(token!),
  });
};

export const useAssignUserZone = (id: number) => {
  const { token } = useAuth();
  return useQuery<AssignUserZone, Error>({
    queryKey: ["assignUserZone", id],
    queryFn: () => assignUserZoneService.fetchById(id, token!),
    enabled: !!id,
  });
};

export const useCreateAssignUserZone = (): UseMutationResult<AssignUserZone, Error, CreateAssignUserZone> => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<AssignUserZone, Error, CreateAssignUserZone>({
    mutationFn: (data) => assignUserZoneService.create(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignUserZones"] });
    },
    onError: (error) => {
      console.error("Error al agregar dato de asiganación de zona:", error.message);
    },
  });
};

export const useUpdateAssignUserZone = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<AssignUserZone, Error, { id: number; data: Partial<CreateAssignUserZone> }>({
    mutationFn: ({ id, data }) => assignUserZoneService.update(id, data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignUserZones"] });
    },
    onError: (error) => {
      console.error("Error al actualizar dato de asiganación de zona:", error.message);
    }
  });
};

export const useDeleteAssignUserZone = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => assignUserZoneService.delete(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignUserZones"] });
    },
    onError: (error) => {
      console.error("Error al eliminar dato de asiganación de zona:", error.message);
    },
  });
};