import { GenericService } from './GenericService';
import { Inventory, CreateInventory } from '../models/Inventory';

class InventoryService extends GenericService<Inventory, CreateInventory> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/inventories`);
    }
}

export const inventoryService = new InventoryService();