import { GenericService } from './GenericService';
import { Project, CreateProject } from '../models/Project';
import axios from 'axios';

class ProjectService extends GenericService<Project, CreateProject> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/projects`);
    }

    async updateProjectStatus(id: number, status: string): Promise<void> {
        try {
            await axios.put(`${this.apiUrl}/${id}/status`, null, {
                params: { status },
            });
        } catch (error) {
            throw new Error(`Error al actualizar el estado del proyecto con ID ${id}`);
        }
    }
}

export const projectService = new ProjectService();