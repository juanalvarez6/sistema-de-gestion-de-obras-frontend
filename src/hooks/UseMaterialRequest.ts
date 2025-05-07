import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { materialRequestService } from "../services/MaterialRequestService";
import { MaterialRequest, CreateMaterialRequest } from "../models/MaterialRequest";

export const useMaterialsRequests = () => {
    return useQuery<MaterialRequest[], Error>({
        queryKey: ["materialsRequests"],
        queryFn: () => materialRequestService.fetchAll(),
    });
};

export const useMaterialRequest = (id: number) => {
    return useQuery<MaterialRequest, Error>({
        queryKey: ["materialRequest", id],
        queryFn: () => materialRequestService.fetchById(id),
        enabled: !!id,
    });
};

export const useCreateMaterialRequest = (): UseMutationResult<MaterialRequest, Error, CreateMaterialRequest> => {
  const queryClient = useQueryClient();
  return useMutation<MaterialRequest, Error, CreateMaterialRequest>({
    mutationFn: (data) => materialRequestService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialsRequests"] });
    },
    onError: (error) => {
      console.error("Error al crear la solicitud de materiale: ", error.message);
    },
  });
};

export const useUpdateMaterialRequest = () => {
    const queryClient = useQueryClient();
    return useMutation<MaterialRequest, Error, { id: number; data: Partial<CreateMaterialRequest> }>({
        mutationFn: ({id, data}) => materialRequestService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["materialsRequests"] });
        },
        onError: (error) => {
            console.error("Error al actualizar la solicitud de materiales:", error.message);
        }
    });
};

export const useDeleteMaterialRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => materialRequestService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialsRequests"] });
    },
    onError: (error) => {
      console.error("Error al eliminar la solicitud de material:", error.message);
    },
  });
};