import { useEffect, useState } from "react";
import { useUpdateWorkZone } from "../../../hooks/UseWorkZone";
import { CreateWorkZone, WorkZone } from "../../../models/WorkZone";
import { useProjects } from "../../../hooks/UseProjects";

interface FormEditWorkZoneProps {
    workZone: WorkZone
}

const FormEditWorkZone = ({ workZone }: FormEditWorkZoneProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: updateWorkZoneMutation, isPending, isSuccess, isError } = useUpdateWorkZone();
    const { data: projects, isLoading } = useProjects();

    const [newWorkZone, setNewWorkZone] = useState<CreateWorkZone>({
        projectId: workZone.project.id,
        name: workZone.name,
        description: workZone.description,
        latitude: workZone.latitude.toString(),
        longitude: workZone.longitude.toString(),
        status: workZone.status,
    });

    const updateWorkZone = () => {
        if (
            !newWorkZone.name.trim() ||
            !newWorkZone.description.trim() ||
            !newWorkZone.status.trim()
        ) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (newWorkZone.projectId === -1) {
            alert("Por favor, selecciona un proyecto.");
            return;
        }

        const formattedWorkZone: CreateWorkZone = {
            ...newWorkZone,
            latitude: Number(newWorkZone.latitude),
            longitude: Number(newWorkZone.longitude),
        };

        updateWorkZoneMutation({ id: workZone.id, data: formattedWorkZone });
        setNewWorkZone({
            projectId: workZone.project.id,
            name: workZone.name,
            description: workZone.description,
            latitude: workZone.latitude.toString(),
            longitude: workZone.longitude.toString(),
            status: workZone.status,
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            alert("La zona de trabajo se actualizo correctamente.");
        }
        if (isError) {
            alert("Error al actualizar la zona de trabajo.");
        }
    }, [isSuccess, isError]);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="m-2"
            >
                <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                    <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-100 flex justify-center items-center ">
                    <div className="bg-gray-100 p-4 rounded-md w-1/2">
                        <div className="bg-gray-100 p-4 rounded-md">
                            <h3 className="text-lg font-semibold mb-2">Actualizar Zona de Trabajo</h3>
                            <label htmlFor="project" className="block text-sm font-medium text-gray-700">Proyecto</label>
                            {isLoading ? (
                                <p>Cargando proyectos...</p>
                            ) : (
                                <select name="project"
                                    className="w-full px-3 py-2 border rounded-md mb-2"
                                    value={newWorkZone.projectId}
                                    onChange={(e) =>
                                        setNewWorkZone({
                                            ...newWorkZone,
                                            projectId: Number(e.target.value),
                                        })
                                    }
                                >
                                    <option value="-1">Seleccione un Proyecto</option>
                                    {projects?.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de la zona</label>
                            <input name="name"
                                type="text"
                                placeholder="Nombre de la Zona"
                                className="w-full px-3 py-2 border rounded-md mb-2"
                                value={newWorkZone.name}
                                onChange={(e) => setNewWorkZone({ ...newWorkZone, name: e.target.value })}
                            />
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción de la zona</label>
                            <textarea name="description"
                                placeholder="Descripción"
                                className="w-full px-3 py-2 border rounded-md mb-2"
                                value={newWorkZone.description}
                                onChange={(e) => setNewWorkZone({ ...newWorkZone, description: e.target.value })}
                            />
                            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado de la zona</label>
                            <select name="estado"
                                className="w-full px-3 py-2 border rounded-md mb-2"
                                value={newWorkZone.status}
                                onChange={(e) => setNewWorkZone({ ...newWorkZone, status: e.target.value as "EN_PROGRESO" | "FINALIZADA", })}
                            >
                                <option value="EN_PROGRESO">En Progreso</option>
                                <option value="FINALIZADA">Finalizada</option>
                            </select>
                            <button
                                onClick={updateWorkZone}
                                className="m-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                disabled={isPending}
                            >
                                {isPending ? "Actualizando..." : "Actualizar Zona"}
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="m-2 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default FormEditWorkZone