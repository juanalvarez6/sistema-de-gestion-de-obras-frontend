import { Material } from "./Material";
import { Project } from "./Project";

export interface MaterialRequest {
    id: number;
    material: Material;
    project: Project;
    userId: string;
    requestedQuantity: number;
    requestDate: Date;
    comments: string;
    status: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
}

export interface CreateMaterialRequest {
    materialId: number;
    projectId: number;
    userId: string;
    requestedQuantity: number;
    comments: string;
    status: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
}