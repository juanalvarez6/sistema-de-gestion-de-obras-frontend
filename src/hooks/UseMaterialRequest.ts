import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { materialRequestService } from "../services/MaterialRequestService";
import { MaterialRequest, CreateMaterialRequest } from "../models/MaterialRequest";
import { useAuth } from "../context/AuthProvider";

export const useMaterialsRequests = () => {
  const { token } = useAuth();
  return useQuery<MaterialRequest[], Error>({
    queryKey: ["materialsRequests"],
    queryFn: () => materialRequestService.fetchAll(token!),
  });
};

export const useMaterialRequest = (id: number) => {
  const { token } = useAuth();
  return useQuery<MaterialRequest, Error>({
    queryKey: ["materialRequest", id],
    queryFn: () => materialRequestService.fetchById(id, token!),
    enabled: !!id,
  });
};

export const useCreateMaterialRequest = (): UseMutationResult<MaterialRequest, Error, CreateMaterialRequest> => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<MaterialRequest, Error, CreateMaterialRequest>({
    mutationFn: (data) => materialRequestService.create(data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialsRequests"] });
    },
    onError: (error) => {
      console.error("Error al crear la solicitud de materiale: ", error.message);
    },
  });
};

export const useUpdateMaterialRequest = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<MaterialRequest, Error, { id: number; data: Partial<CreateMaterialRequest> }>({
    mutationFn: ({ id, data }) => materialRequestService.update(id, data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialsRequests"] });
    },
    onError: (error) => {
      console.error("Error al actualizar la solicitud de materiales:", error.message);
    }
  });
};

export const useDeleteMaterialRequest = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => materialRequestService.delete(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialsRequests"] });
    },
    onError: (error) => {
      console.error("Error al eliminar la solicitud de material:", error.message);
    },
  });
};