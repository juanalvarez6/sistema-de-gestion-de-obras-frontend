import axios from 'axios';
import { WorkZone, CreateWorkZone } from '../models/WorkZone';

const API_URL = 'http://localhost:8080/api/zones';

export const fetchWorkZones = async (): Promise<WorkZone[]> => {
    try {
        const response = await axios.get<WorkZone[]>(API_URL);
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener las zonas");
    }
};

export const fetchWorkZoneById = async (id: number): Promise<WorkZone> => {
    try {
        const response = await axios.get<WorkZone>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener el proyecto con ID ${id}`);
    }
};

export const createWorkZone = async (workZoneData: CreateWorkZone): Promise<WorkZone> => {
    try {
        const response = await axios.post<WorkZone>(API_URL, workZoneData);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear el la zona");
    }
};

export const updateWorkZone = async (id: number, workZoneData: Partial<CreateWorkZone>): Promise<WorkZone> => {
    try {
        const response = await axios.put<WorkZone>(`${API_URL}/${id}`, workZoneData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar la zona con ID ${id}`);
    }
};

export const deleteWorkZone = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Error al eliminar la zona con ID ${id}`);
    }
};