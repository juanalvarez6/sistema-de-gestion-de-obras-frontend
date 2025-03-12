import Zone from "./Zone";
import User from './User';

interface Task {
    id: number;
    zone: Zone;
    user: User;
    description: string;
    status: "pendiente" | "en curso" | "completada";
    assignmentDate: Date;
    completionDate: Date;
    priority: "alta" | "media" | "baja";
}

export default Task