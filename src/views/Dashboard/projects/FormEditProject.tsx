import { useEffect, useState } from "react";
import { CreateProject, Project } from "../../../models/Project"
import { useUpdateProject } from "../../../hooks/UseProjects";

interface FormEditProjectProps {
    project: Project
}

const FormEditProject = ({ project }: FormEditProjectProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: UpdateProjectMutation, isPending, isSuccess } = useUpdateProject();

    const [newProject, setNewProject] = useState<CreateProject>({
        name: project.name,
        description: project.description,
        latitude: project.latitude.toString(),
        longitude: project.longitude.toString(),
        startDate: new Date(project.startDate).toISOString().split("T")[0], // Formato YYYY-MM-DD
        endDate: new Date(project.endDate).toISOString().split("T")[0],     // Formato YYYY-MM-DD
        status: project.status,
    });

    const updateProject = () => {
        if (
            !newProject.name.trim() ||
            !newProject.description.trim() ||
            !newProject.startDate.trim() ||
            !newProject.endDate.trim() ||
            !newProject.status.trim()
        ) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (new Date(newProject.startDate) >= new Date(newProject.endDate)) {
            alert("La fecha de inicio debe ser anterior a la fecha de finalización.");
            return;
        }

        const formattedProject: CreateProject = {
            ...newProject,
            latitude: Number(newProject.latitude),
            longitude: Number(newProject.longitude),
        };

        UpdateProjectMutation({ id: project.id, data: formattedProject });
        setNewProject({
            name: project.name,
            description: project.description,
            latitude: project.latitude.toString(),
            longitude: project.longitude.toString(),
            startDate: new Date(project.startDate).toISOString().split("T")[0], // Formato YYYY-MM-DD
            endDate: new Date(project.endDate).toISOString().split("T")[0],     // Formato YYYY-MM-DD
            status: project.status,
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            alert("El proyecto se actualizó correctamente.");
        }
    }, [isSuccess]);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="m-1.5"
            >
                <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
            </button>
            {/* Modal para Editar */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-100 flex justify-center">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Editar Proyecto</h3>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Proyecto</label>
                        <input name="name"
                            type="text"
                            placeholder="Nombre del Proyecto"
                            className="w-full px-3 py-2 border rounded-md mb-2"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        />
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea name="description"
                            placeholder="Descripción"
                            className="w-full px-3 py-2 border rounded-md mb-2"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        />
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                        <input name="startDate"
                            type="date"
                            className="w-full px-3 py-2 border rounded-md mb-2"
                            value={newProject.startDate}
                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                        />
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de finalización</label>
                        <input name="endDate"
                            type="date"
                            className="w-full px-3 py-2 border rounded-md mb-2"
                            value={newProject.endDate}
                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                        />
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                        <select name="status"
                            className="w-full px-3 py-2 border rounded-md mb-2"
                            value={newProject.status}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    status: e.target.value as "EN_PROGRESO" | "FINALIZADO" | "SUSPENDIDO",
                                })
                            }
                        >
                            <option value="EN_PROGRESO">En Progreso</option>
                            <option value="FINALIZADO">Finalizado</option>
                            <option value="SUSPENDIDO">Suspendido</option>
                        </select>
                        <button
                            onClick={updateProject}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            disabled={isPending}
                        >
                            {isPending ? "Actualizando..." : "Actualizar"}
                        </button>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormEditProject