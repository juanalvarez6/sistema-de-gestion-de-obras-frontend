import axios, { AxiosResponse } from 'axios';

export abstract class GenericService<T, CreateT = T> {
    protected apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async fetchAll(): Promise<T[]> {
        try {
            const response: AxiosResponse<T[]> = await axios.get(this.apiUrl);
            return response.data;
        } catch (error) {
            throw new Error("Error al obtener los datos");
        }
    }

    async fetchById(id: number): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(`${this.apiUrl}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error al obtener el elemento con ID ${id}`);
        }
    }

    async create(data: CreateT): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.post(this.apiUrl, data);
            return response.data;
        } catch (error) {
            throw new Error("Error al crear el elemento");
        }
    }

    async update(id: number, data: Partial<CreateT>): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.put(`${this.apiUrl}/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error(`Error al actualizar el elemento con ID ${id}`);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/${id}`);
        } catch (error) {
            throw new Error(`Error al eliminar el elemento con ID ${id}`);
        }
    }
}