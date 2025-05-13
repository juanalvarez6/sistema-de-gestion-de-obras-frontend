export type statusProject = 'EN_PROGRESO' | 'FINALIZADO' | 'SUSPENDIDO';

export interface Project {
    id: number;
    name: string;
    description: string;
    latitude: number | string;
    longitude: number | string;
    startDate: string;
    endDate: string;
    status: statusProject;
    createdAt: string;
}

export interface CreateProject {
    name: string;
    description: string;
    latitude: number | string;
    longitude: number | string;
    startDate: string;
    endDate: string;
}