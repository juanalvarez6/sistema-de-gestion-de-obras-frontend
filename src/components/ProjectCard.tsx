import { Calendar, CalendarCheck, Clock, MapPin, Pencil, Trash2 } from "lucide-react";
import { Project } from "../models/Project";
import EditProjectStatus from "../views/admin/projects/EditProjectStatus";
//import { useState } from "react";

interface Props {
    project: Project;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: Props) => {
    const showActions = project.status !== "FINALIZADO";

    return (
        <div className="bg-white rounded-xl shadow-lg border p-6 w-full hover:shadow-xl transition duration-300 relative">
            {/* Botones de acción */}
            {showActions && onEdit && onDelete && (
                <div>
                    <div className="absolute bottom-2 left-2">
                        <button
                            onClick={() => onEdit(project.id)}
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all hover:shadow-xl  duration-300 hover:scale-120"
                            aria-label="Editar proyecto"
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="absolute bottom-2 right-2">
                        <button
                            onClick={() => onDelete(project.id)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all hover:shadow-xl  duration-300 hover:scale-120"
                            aria-label="Eliminar proyecto"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>

                </div>
            )}

            {/* Contenido de la tarjeta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:px-6 sm:items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 break-words">
                    {project.name}
                </h2>
                <EditProjectStatus project={project} />
            </div>

            <p className="text-gray-600 text-sm mb-4">{project.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-500 p-2">
                <p className="flex gap-0.5 items-center justify-center">
                    <MapPin /><strong>Ubicación: </strong>
                    <a
                        href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <span>Ver En Google Maps</span>
                    </a>
                </p>

                <div className="flex gap-0.5 items-center justify-center">
                    <Calendar /><p ><strong>Inicio:</strong> {new Date(project.startDate).toISOString().split("T")[0]}</p>
                </div>
                <div className="flex gap-0.5 items-center justify-center">
                    <CalendarCheck /><p><strong>Fin:</strong> {new Date(project.endDate).toISOString().split("T")[0]}</p>
                </div>
                <div className="flex gap-0.5 items-center justify-center">
                    <Clock /><p><strong>Creado:</strong> {new Date(project.createdAt).toISOString().split("T")[0]}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;