import { GenericService } from './GenericService';
import { WorkZone, CreateWorkZone } from '../models/WorkZone';

class WorkZoneService extends GenericService<WorkZone, CreateWorkZone> {
    constructor() {
        super(`${import.meta.env.VITE_API_GESTION}/zones`);
    }
}

export const workZoneService = new WorkZoneService();