import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import {
    fetchWorkZones,
    fetchWorkZoneById,
    createWorkZone,
    updateWorkZone,
    deleteWorkZone } from "../services/WorkZone";

import { WorkZone, CreateWorkZone } from "../models/WorkZone";

export const useWorkZones = () => {
    return useQuery<WorkZone[], Error>({
      queryKey: ["workZones"],
      queryFn: fetchWorkZones,
    });
  };

  export const useWorkZone = (id: number) => {
    return useQuery<WorkZone, Error>({
      queryKey: ["workZone", id],
      queryFn: () => fetchWorkZoneById(id),
      enabled: !!id,
    });
  };

  export const useCreateWorkZone = (): UseMutationResult<WorkZone, Error, CreateWorkZone> => {
    const queryClient = useQueryClient();
    return useMutation<WorkZone, Error, CreateWorkZone>({
      mutationFn: createWorkZone,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workZones"] });
      },
      onError: (error) => {
        console.error("Error al crear la zona:", error.message);
      },
    });
  };

  export const useUpdateWorkZone = () => {
    const queryClient = useQueryClient();
    return useMutation<WorkZone, Error, { id: number; data: Partial<CreateWorkZone> }>({
      mutationFn: ({ id, data }) => updateWorkZone(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workZones"] });
      },
      onError: (error) => {
        console.error("Error al actualizar la zona:", error.message);
      },
    });
  };

  export const useDeleteWorkZone = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
      mutationFn: deleteWorkZone,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["workZones"] });
      },
      onError: (error) => {
        console.error("Error al eliminar la zona:", error.message);
      },
    });
  };
