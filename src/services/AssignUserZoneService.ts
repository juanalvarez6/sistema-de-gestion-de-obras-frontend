import { GenericService } from './GenericService';
import { AssignUserZone, CreateAssignUserZone } from '../models/AssignUserZone';
import axios, { AxiosResponse } from 'axios';
import { WorkZone } from '../models/WorkZone';

class AssignUserZoneService extends GenericService<AssignUserZone, CreateAssignUserZone> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/assign_user_zones`);
    }

    async fetchZoneByUserId(userId: string, token: string): Promise<WorkZone> {
        try {
            const response: AxiosResponse<WorkZone> = await axios.get(
                `${this.apiUrl}/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('No se encontró una zona asignada para este usuario');
            }
            if (error.response?.status === 403) {
                throw new Error('No tienes permiso para acceder a esta información');
            }
            throw new Error('Error al obtener la zona asignada');
        }
    }
}

export const assignUserZoneService = new AssignUserZoneService();