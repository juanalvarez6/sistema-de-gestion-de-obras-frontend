import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { materialService } from "../services/MaterialService";
import { Material, CreateMaterial } from "../models/Material";

export const useMaterials = () => {
    return useQuery<Material[], Error>({
        queryKey: ["materials"],
        queryFn: () => materialService.fetchAll(),
    });
};

export const useMaterial = (id: number) => {
    return useQuery<Material, Error>({
        queryKey: ["material", id],
        queryFn: () => materialService.fetchById(id),
        enabled: !!id,
    });
};

export const useCreateMaterial = (): UseMutationResult<Material, Error, CreateMaterial> => {
  const queryClient = useQueryClient();
  return useMutation<Material, Error, CreateMaterial>({
    mutationFn: (data) => materialService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
    onError: (error) => {
      console.error("Error al crear el Material:", error.message);
    },
  });
};

export const useUpdateMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation<Material, Error, { id: number; data: Partial<CreateMaterial> }>({
        mutationFn: ({id, data}) => materialService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["materials"] });
        },
        onError: (error) => {
            console.error("Error al actualizar el material:", error.message);
        }
    });
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => materialService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
    onError: (error) => {
      console.error("Error al eliminar el Material:", error.message);
    },
  });
};