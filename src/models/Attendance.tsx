import User from './User';
import Zone from "./Zone";

interface Attendance {
    id: number;
    user: User;
    zone: Zone;
    date: Date;
    checkIn: Date;
    checkOut: Date;
    locationName: string;
    latitude: number;
    longitude: number;
}

export default Attendance