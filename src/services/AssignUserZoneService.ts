import { GenericService } from './GenericService';
import { AssignUserZone, CreateAssignUserZone } from '../models/AssignUserZone';

class AssignUserZoneService extends GenericService<AssignUserZone, CreateAssignUserZone> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/assign_user_zones`);
    }
}

export const assignUserZoneService = new AssignUserZoneService();