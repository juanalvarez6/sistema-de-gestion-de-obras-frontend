import { GenericService } from './GenericService';
import { WorkZone, CreateWorkZone } from '../models/WorkZone';
import axios from 'axios';

class WorkZoneService extends GenericService<WorkZone, CreateWorkZone> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/zones`);
    }

    async updateWorkZoneStatus(id: number, status: string): Promise<void> {
        try {
            await axios.put(`${this.apiUrl}/${id}/status`, null, {
                params: { status },
            });
        } catch (error) {
            throw new Error(`Error al actualizar el estado de WorkZone con ID ${id}`);
        }
    }

}

export const workZoneService = new WorkZoneService();