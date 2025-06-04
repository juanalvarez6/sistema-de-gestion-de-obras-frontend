import { GenericService } from './GenericService';
import { MaterialRequest, CreateMaterialRequest } from '../models/MaterialRequest';
import axios, { AxiosResponse } from 'axios';

class MaterialRequestService extends GenericService<MaterialRequest, CreateMaterialRequest> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/material-requests`);
    }

    async getByUserId(userId: string, token: string): Promise<MaterialRequest[]> {
        try {
            const response: AxiosResponse<MaterialRequest[]> = await axios.get(
                `${this.apiUrl}/by-user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 403) {
                throw new Error("No tienes permisos para ver las solicitudes de materiales");
            }
            throw new Error("Error al obtener las solicitudes por usuario");
        }
    }
}

export const materialRequestService = new MaterialRequestService();