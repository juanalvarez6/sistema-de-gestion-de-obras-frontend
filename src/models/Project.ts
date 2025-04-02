export interface Project {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    startDate: Date;
    endDate: Date;
    status: 'EN_PROGRESO' | 'FINALIZADO' | 'SUSPENDIDO';
    createdAt: Date;
}

export interface CreateProject {
    name: string;
    description: string;
    latitude: number | string;
    longitude: number | string;
    startDate: string;
    endDate: string;
    status: 'EN_PROGRESO' | 'FINALIZADO' | 'SUSPENDIDO';
}