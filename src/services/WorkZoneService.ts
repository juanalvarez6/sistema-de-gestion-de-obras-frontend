import { GenericService } from './GenericService';
import { WorkZone, CreateWorkZone } from '../models/WorkZone';
import axios from 'axios';

class WorkZoneService extends GenericService<WorkZone, CreateWorkZone> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/zones`);
    }

    async updateWorkZoneStatus(
        id: number,
        status: string,
        token: string
    ): Promise<void> {
        try {
            await axios.put(`${this.apiUrl}/${id}/status`,
                null,
                {
                    params: { status },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('No autorizado - Token inválido o expirado');
            }
            if (error.response?.status === 403) {
                throw new Error('No tienes permisos para actualizar WorkZones');
            }
            throw new Error(`Error al actualizar el estado de WorkZone con ID ${id}: ${error.message}`);
        }
    }

}

export const workZoneService = new WorkZoneService();