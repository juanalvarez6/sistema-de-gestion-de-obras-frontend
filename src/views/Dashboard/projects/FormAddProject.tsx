import { useEffect, useState } from "react";
import { useCreateProject } from "../../../hooks/UseProjects";
import { CreateProject } from "../../../models/Project"

const FormAddProject = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: createProjectMutation, isPending, isSuccess } = useCreateProject();

    const [newProject, setNewProject] = useState<CreateProject>({
        name: "",
        description: "",
        latitude: "40.7128",
        longitude: "-74.006",
        startDate: "",
        endDate: "",
        status: "EN_PROGRESO",
    });

    const addProject = () => {
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

        createProjectMutation(formattedProject);
        setNewProject({
            name: "",
            description: "",
            latitude: "",
            longitude: "",
            startDate: "",
            endDate: "",
            status: "EN_PROGRESO",
        });

        useEffect(() => {
            if (isSuccess) {
                setIsModalOpen(false);
                alert("El proyecto se guardo correctamente.");
            }
        }, [isSuccess]);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className=" bg-blue-500 text-white px-4 py-2 rounded-md m-2 hover:bg-blue-600"
            >Agregar Proyecto</button>
            {/* Modal para Agregar Proyecto */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-100 flex justify-center items-center">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Agregar Nuevo Proyecto</h3>
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
                            onClick={addProject}
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            disabled={isPending}
                        >
                            {isPending ? "Agregando..." : "Agregar"}
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

export default FormAddProject