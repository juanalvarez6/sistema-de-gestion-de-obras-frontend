import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { inventoryService } from "../services/InventoryService";
import { Inventory, CreateInventory } from "../models/Inventory";

export const useInventories = () => {
    return useQuery<Inventory[], Error>({
        queryKey: ["inventories"],
        queryFn: () => inventoryService.fetchAll(),
    });
};

export const useInventory = (id: number) => {
    return useQuery<Inventory, Error>({
        queryKey: ["inventory", id],
        queryFn: () => inventoryService.fetchById(id),
        enabled: !!id,
    });
};

export const useCreateInventory = (): UseMutationResult<Inventory, Error, CreateInventory> => {
  const queryClient = useQueryClient();
  return useMutation<Inventory, Error, CreateInventory>({
    mutationFn: (data) => inventoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (error) => {
      console.error("Error al agregar dato al inventario:", error.message);
    },
  });
};

export const useUpdateInventory = () => {
    const queryClient = useQueryClient();
    return useMutation<Inventory, Error, { id: number; data: Partial<CreateInventory> }>({
        mutationFn: ({id, data}) => inventoryService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["inventories"] });
        },
        onError: (error) => {
            console.error("Error al actualizar dato del inventario:", error.message);
        }
    });
};

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => inventoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (error) => {
      console.error("Error al eliminar dato del inventario:", error.message);
    },
  });
};