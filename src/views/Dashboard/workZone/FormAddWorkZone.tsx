import { useEffect, useState } from "react";
import { useCreateWorkZone } from "../../../hooks/UseWorkZone";
import { CreateWorkZone } from "../../../models/WorkZone";
import { useProjects } from "../../../hooks/UseProjects";

const FormAddWorkZone = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: createWorkZoneMutation, isPending, isSuccess, isError } = useCreateWorkZone();
    const { data: projects, isLoading } = useProjects();

    const [newWorkZone, setNewWorkZone] = useState<CreateWorkZone>({
        project: { id: 0 },
        name: "",
        description: "",
        latitude: "40.7128",
        longitude: "-74.006",
        status: "EN_PROGRESO",
    });

    const addWorkZone = () => {
        if (
            !newWorkZone.name.trim() ||
            !newWorkZone.description.trim() ||
            !newWorkZone.status.trim()
        ) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (newWorkZone.project.id === -1) {
            alert("Por favor, selecciona un proyecto.");
            return;
        }

        const formattedWorkZone: CreateWorkZone = {
            ...newWorkZone,
            latitude: Number(newWorkZone.latitude),
            longitude: Number(newWorkZone.longitude),
        };

        createWorkZoneMutation(formattedWorkZone);
        setNewWorkZone({
            project: { id: -1 },
            name: "",
            description: "",
            latitude: "",
            longitude: "",
            status: "EN_PROGRESO",
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            alert("La zona de trabajo se guardó correctamente.");
        }
        if (isError) {
            alert("Error al guardar la zona de trabajo.");
        }
    }, [isSuccess, isError]);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className=" bg-blue-500 text-white px-4 py-2 rounded-md m-2 hover:bg-blue-600"
            >Agregar Zona</button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-100 flex justify-center items-center ">
                    <div className="bg-gray-100 p-4 rounded-md w-1/2">
                        <div className="bg-gray-100 p-4 rounded-md">
                            <h3 className="text-lg font-semibold mb-2">Crear Zona de Trabajo</h3>
                            <label htmlFor="project" className="block text-sm font-medium text-gray-700">Proyecto</label>
                            {isLoading ? (
                                <p>Cargando proyectos...</p>
                            ) : (
                                <select name="project"
                                    className="w-full px-3 py-2 border rounded-md mb-2"
                                    value={newWorkZone.project.id}
                                    onChange={(e) =>
                                        setNewWorkZone({
                                            ...newWorkZone,
                                            project: { id: Number(e.target.value) },
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
                                onClick={addWorkZone}
                                className="m-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                disabled={isPending}
                            >
                                {isPending ? "Creando..." : "Crear Zona"}
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

export default FormAddWorkZone