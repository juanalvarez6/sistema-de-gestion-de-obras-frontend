import { CalendarCheck, MapPin, Pencil, Trash2, Layers, Calendar } from "lucide-react";
import { WorkZone } from "../models/WorkZone";
import EditZoneStatus from "./EditZoneStatus";

interface Props {
    zone: WorkZone;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const ZoneCard = ({ zone, onEdit, onDelete }: Props) => {
    const showActions = zone.status !== "FINALIZADA";

    return (
        <div className="bg-white rounded-xl shadow-lg border p-6 w-full hover:shadow-xl transition duration-300 relative">
            {/* Botones de acción */}
            {showActions && onEdit && onDelete && (
                <div>
                    <div className="absolute bottom-2 left-2">
                        <button
                            onClick={() => onEdit(zone.id)}
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all hover:shadow-xl duration-300 hover:scale-120"
                            aria-label="Editar zona"
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="absolute bottom-2 right-2">
                        <button
                            onClick={() => onDelete(zone.id)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all hover:shadow-xl duration-300 hover:scale-120"
                            aria-label="Eliminar zona"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Contenido de la tarjeta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:px-6 sm:items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 break-words">
                    {zone.name}
                </h2>
                <EditZoneStatus
                    zone={zone}
                />
            </div>

            <p className="text-gray-600 text-sm mb-4">{zone.description}</p>

            <div className="grid grid-cols-1 gap-1 text-sm text-gray-500 p-2">
                <div className="flex gap-0.5 items-center justify-center">
                    <Layers /><p><strong>Proyecto:</strong> {zone.project?.name}</p>
                </div>
                <p className="flex gap-0.5 items-center justify-center">
                    <MapPin /><strong>Ubicación: </strong>
                    <a
                        href={`https://www.google.com/maps?q=${zone.project.latitude},${zone.project.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <span>Ver En Google Maps</span>
                    </a>
                </p>
                <div className="flex gap-0.5 items-center justify-center">
                    <CalendarCheck /><p><strong>Fin Proyecto:</strong> {zone.project?.endDate ? new Date(zone.project.endDate).toISOString().split("T")[0] : "N/A"}</p>
                </div>
                <div className="flex gap-0.5 items-center justify-center">
                    <Calendar /><p><strong>Inicio Proyecto:</strong> {zone.project?.startDate ? new Date(zone.project.startDate).toISOString().split("T")[0] : "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default ZoneCard;