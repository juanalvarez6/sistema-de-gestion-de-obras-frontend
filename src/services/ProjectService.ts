import axios from 'axios';
import { Project, CreateProject } from '../models/Project';

const API_URL = 'http://localhost:8080/api/projects';

export const fetchProjects = async (): Promise<Project[]> => {
    try {
        const response = await axios.get<Project[]>(API_URL);
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los proyectos");
    }
};
  
export const fetchProjectById = async (id: number): Promise<Project> => {
    try {
        const response = await axios.get<Project>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener el proyecto con ID ${id}`);
    }
};

export const createProject = async (projectData: CreateProject): Promise<Project> => {
    try {
        const response = await axios.post<Project>(API_URL, projectData);
        return response.data;
    } catch (error) {
        throw new Error("Error al crear el proyecto");
    }
};

export const updateProject = async (id: number, projectData: Partial<CreateProject>): Promise<Project> => {
    try {
        const response = await axios.put<Project>(`${API_URL}/${id}`, projectData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el proyecto con ID ${id}`);
    }
};

export const deleteProject = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw new Error(`Error al eliminar el proyecto con ID ${id}`);
    }
};