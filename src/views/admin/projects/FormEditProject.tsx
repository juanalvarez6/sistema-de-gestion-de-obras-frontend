import { useEffect, useState } from "react";
import MapModal from "../../../components/MapModal";
import { useUpdateProject } from "../../../hooks/UseProjects";
import { CreateProject, Project } from "../../../models/Project";
import { MessageModal, MessageType } from "../../../components/MessageModal";
import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FormEditProjectProps {
    projectToEdit: Project;
    onClose: () => void;
    onMesaje?: (message: string, type: MessageType) => void;
}

export const FormEditProject = ({ projectToEdit, onClose, onMesaje }: FormEditProjectProps) => {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>({
        lat: Number(projectToEdit.latitude),
        lng: Number(projectToEdit.longitude)
    });

    const { mutate: updateProjectMutation, isSuccess: isSuccessEditProject, isError: isErrorEditProject, isPending: isPendingEditProject } = useUpdateProject();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"error" | "success" | "warning" | "info">("error");

    const [isOpen, setIsOpen] = useState(true);

    const [newProject, setProject] = useState<CreateProject>({
        name: projectToEdit.name,
        description: projectToEdit.description,
        latitude: projectToEdit.latitude,
        longitude: projectToEdit.longitude,
        startDate: projectToEdit.startDate,
        endDate: projectToEdit.endDate,
    });

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleSubmit = () => {
        if (!newProject.name.trim() || !newProject.description.trim() || !newProject.startDate || !newProject.endDate) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error");
            return;
        }

        if (new Date(newProject.startDate) >= new Date(newProject.endDate)) {
            setMessage("La fecha de inicio debe ser anterior a la de finalización.");
            setMessageType("error");
            return;
        }

        updateProjectMutation({ id: projectToEdit.id, data: newProject });
        setProject({
            name: projectToEdit.name,
            description: projectToEdit.description,
            latitude: projectToEdit.latitude,
            longitude: projectToEdit.longitude,
            startDate: projectToEdit.startDate,
            endDate: projectToEdit.endDate,
        });
    };

    useEffect(() => {
        if (isSuccessEditProject) {
            if (onMesaje) {
                onMesaje("Proyecto actualizado exitosamente!", "success")
            }
            onClose();
            return;
        } else if (isErrorEditProject) {
            if (onMesaje) {
                onMesaje("Hubo un error al actualizar el proyecto!", "error")
            }
            onClose();
        }
    }, [isSuccessEditProject, isErrorEditProject]);

    return (
        <>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-gradient-to-tr from-gray-900 to-gray-300 bg-opacity-50 flex items-start md:items-center justify-center z-50 p-4 overflow-y-auto"
                    >
                        <motion.div
                            key="modal-content"
                            initial={{ y: -50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 300,
                                bounce: 0.2
                            }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-auto"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-t-2xl text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Editar Proyecto</h3>
                                    <button onClick={handleClose} className="text-white hover:text-gray-200 focus:outline-none">
                                        <X/>
                                    </button>
                                </div>
                            </div>

                            <div className="p-5">
                                <form
                                    className="space-y-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-lg"
                                            value={newProject.name}
                                            onChange={(e) => setProject({ ...newProject, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                        <textarea
                                            rows={3}
                                            className="w-full p-2 border rounded-lg"
                                            value={newProject.description}
                                            onChange={(e) => setProject({ ...newProject, description: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <MapModal
                                            onSelect={(lat, lng) => {
                                                setCoords({ lat, lng });
                                                setProject({ ...newProject, latitude: lat, longitude: lng });
                                            }}
                                            initialCoords={[Number(projectToEdit.latitude), Number(projectToEdit.longitude)]}
                                        />
                                        {coords && (
                                            <div>
                                                <p>
                                                    <a
                                                        href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        <MapPin />
                                                        <span>Ver en Google Maps</span>
                                                    </a>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                                            <input
                                                type="date"
                                                className="w-full p-2 border rounded-lg"
                                                value={newProject.startDate}
                                                onChange={(e) => setProject({ ...newProject, startDate: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                                            <input
                                                type="date"
                                                className="w-full p-2 border rounded-lg"
                                                value={newProject.endDate}
                                                onChange={(e) => setProject({ ...newProject, endDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                                        disabled={isPendingEditProject}
                                    >
                                        {isPendingEditProject ? "Actualizando..." : "Actualizar Proyecto"}
                                    </button>
                                </form>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {message && (
                <MessageModal
                    message={message}
                    type={messageType}
                    onClose={() => setMessage(null)}
                />
            )}
        </>
    );
};
