import { GenericService } from './GenericService';
import { MaterialRequest, CreateMaterialRequest } from '../models/MaterialRequest';

class MaterialRequestService extends GenericService<MaterialRequest, CreateMaterialRequest> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/material-requests`);
    }
}

export const materialRequestService = new MaterialRequestService();