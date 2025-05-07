import { GenericService } from './GenericService';
import { Project, CreateProject } from '../models/Project';

class ProjectService extends GenericService<Project, CreateProject> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/projects`);
    }
}

export const projectService = new ProjectService();