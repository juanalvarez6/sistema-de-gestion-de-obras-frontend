import ProjectCard from "../../../components/ProjectCard";
import { useState } from "react";
import { FormAddProject } from "./FormAddProject";
import { useProjects } from "../../../hooks/UseProjects";
import { FormEditProject } from "./FormEditProject";
import { Project } from "../../../models/Project";
import { MessageModal, MessageType } from "../../../components/MessageModal";
import { FormDeleteProject } from "./FormDeleteProject";
import { CircleArrowLeft, CircleArrowRight, Plus } from "lucide-react";
import { useProjectSync } from "../../../hooks/useWebSocketSync";

const PAGE_SIZE = 4;

export const ProjectView = () => {

    const { data: allpProjects, isError, isLoading } = useProjects();
    const projects = [...(allpProjects ?? [])].reverse();

    useProjectSync();

    const [notification, setNotification] = useState<{ message: string, type: MessageType } | null>(null);

    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState<"todos" | "en_progreso" | "finalizado" | "suspendido">("todos");
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);

    const [projectEdit, setProjectEdit] = useState<Project | null>(null);

    // Filtrar proyectos según el estado seleccionado
    const filteredProjects = (projects ?? []).filter(project => {
        if (filter === "todos") return true;
        return project.status === filter.toUpperCase();
    });

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const currentPageProjects = filteredProjects.slice(page * PAGE_SIZE, start + PAGE_SIZE);

    const hasNext = end < filteredProjects.length;
    const hasPrevious = page > 0;

    const handleNext = () => hasNext && setPage(prev => prev + 1);
    const handlePrevious = () => hasPrevious && setPage(prev => prev - 1);

    const handleFilterChange = (newFilter: typeof filter) => {
        setFilter(newFilter);
        setPage(0);
    };

    return (
        <>
            <div className="flex justify-between flex-wrap">
                <h2 className="text-2xl font-semibold text-gray-800 md:m-0 mx-auto">
                    Gestión de Proyectos
                </h2>

                {/* Nuevo Proyecto */}
                <div className="my-4 sm:my-0 mx-auto md:m-0">
                    {/* Botón para Nuevo Proyecto */}
                    {!openAddForm && (
                        <button
                            onClick={() => setOpenAddForm(true)}
                            className="mx-auto md:m-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        >
                            <Plus />
                            Nuevo Proyecto
                        </button>
                    )}

                    {/* Formulario */}
                    {openAddForm && (
                        <FormAddProject onClose={() => setOpenAddForm(false)} onMesaje={(message, type) => setNotification({ message, type })} />
                    )}
                </div>
            </div>

            {isLoading ? (
                <p className="text-center text-gray-500">Cargando proyectos...</p>
            ) : isError ? (
                <p className="text-center text-red-500">Error al cargar proyectos</p>
            ) : !projects || projects.length === 0 ? (
                <p className="text-center text-gray-500">No hay proyectos disponibles</p>
            ) : (
                <div className="space-y-6">

                    <div>
                        {/* Componente de Filtro */}
                        <ProjectFilter
                            currentFilter={filter}
                            onFilterChange={handleFilterChange}
                        />

                        {/* Contenedor grid para las tarjetas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentPageProjects.map((project) => (
                                <ProjectCard key={project.id} project={project}
                                    onEdit={() => {
                                        setOpenEditForm(true);
                                        setProjectEdit(project);

                                    }
                                    }
                                    onDelete={() => {
                                        setOpenDeleteForm(true);
                                        setProjectEdit(project);
                                    }}
                                />
                            ))}
                            {openEditForm && projectEdit && (
                                <FormEditProject projectToEdit={projectEdit} onClose={() => setOpenEditForm(false)} onMesaje={(message, type) => setNotification({ message, type })} />
                            )}
                            {openDeleteForm && projectEdit && (
                                <FormDeleteProject projectId={projectEdit.id} onClose={() => setOpenDeleteForm(false)} onMesaje={(message, type) => setNotification({ message, type })} />
                            )}
                        </div>

                        {/* Componente de Paginación - Solo muestra si hay resultados */}
                        {filteredProjects.length > 0 && (
                            <Pagination
                                hasPrevious={hasPrevious}
                                hasNext={hasNext}
                                onPrevious={handlePrevious}
                                onNext={handleNext}
                            />
                        )}

                        {/* Mensaje cuando no hay resultados */}
                        {filteredProjects.length === 0 && (
                            <NoResults onResetFilter={() => handleFilterChange("todos")} />
                        )}
                    </div>

                </div>
            )
            }

            {notification && (
                <MessageModal
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};


interface FilterProps {
    currentFilter: "todos" | "en_progreso" | "finalizado" | "suspendido";
    onFilterChange: (filter: "todos" | "en_progreso" | "finalizado" | "suspendido") => void;
}

// Componente de Filtro
const ProjectFilter = ({ currentFilter, onFilterChange }: FilterProps) => {
    return (
        <div className="bg-white px-6 pb-6 rounded-2xl shadow-lg mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar proyectos:</label>

            {/* Select para móvil */}
            <select
                onChange={(e) => onFilterChange(e.target.value as typeof currentFilter)}
                value={currentFilter}
                className={`md:hidden w-full p-2 border rounded-lg mb-4 transition-colors ${currentFilter === "todos" ? "bg-blue-600 text-white border-blue-300" :
                    currentFilter === "en_progreso" ? "bg-yellow-500 text-white border-yellow-200" :
                        currentFilter === "finalizado" ? "bg-green-500 text-white border-green-200" :
                            "bg-red-500 text-white border-red-200"
                    }`}
            >
                <option value="todos">Todos</option>
                <option value="en_progreso">En Progreso</option>
                <option value="finalizado">Finalizados</option>
                <option value="suspendido">Suspendidos</option>
            </select>

            {/* Botones para desktop */}
            <div className="hidden md:grid grid-cols-4 gap-2">
                {[
                    { value: "todos", label: "Todos", color: "bg-blue-600" },
                    { value: "en_progreso", label: "En Progreso", color: "bg-yellow-500" },
                    { value: "finalizado", label: "Finalizados", color: "bg-green-500" },
                    { value: "suspendido", label: "Suspendidos", color: "bg-red-500" }
                ].map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onFilterChange(option.value as typeof currentFilter)}
                        className={`px-4 py-2 rounded-lg transition-all ${currentFilter === option.value
                            ? `${option.color} text-white`
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Interface para el componente de Paginación
interface PaginationProps {
    hasPrevious: boolean;
    hasNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

// Componente de Paginación
const Pagination = ({ hasPrevious, hasNext, onPrevious, onNext }: PaginationProps) => {
    return (
        <div className="flex justify-center gap-4 mt-8">
            <button
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={`px-4 py-2 flex gap-3 items-center rounded-md font-medium border transition ${hasPrevious
                    ? "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    }`}
            >
                <CircleArrowLeft />
            </button>
            <button
                onClick={onNext}
                disabled={!hasNext}
                className={`px-4 py-2 flex gap-3 items-center rounded-md font-medium border transition ${hasNext
                    ? "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    }`}
            >
                <CircleArrowRight />
            </button>
        </div>
    );
};

// Componente para cuando no hay resultados
const NoResults = ({ onResetFilter }: { onResetFilter: () => void }) => {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hay Proyectos</h3>
            <p className="mt-2 text-gray-600">No se encontraron Proyectos con el filtro seleccionado</p>
            <button
                onClick={onResetFilter}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Ver todos los proyectos
            </button>
        </div>
    );
};