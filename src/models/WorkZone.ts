import { Project } from './Project';

export interface WorkZone {
    id: number;
    project: Project;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    status: 'EN_PROGRESO' | 'FINALIZADA';
}

export interface CreateWorkZone {
    project: {id: number};
    name: string;
    description: string;
    latitude: number | string;
    longitude: number | string;
    status: 'EN_PROGRESO' | 'FINALIZADA';
}