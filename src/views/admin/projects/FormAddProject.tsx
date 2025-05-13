import { useEffect, useState } from "react";
import MapModal from "../../../components/MapModal";
import { useCreateProject } from "../../../hooks/UseProjects";
import { CreateProject } from "../../../models/Project";
import { MessageModal, MessageType } from "../../../components/MessageModal";
import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


interface FormAddProjectProps {
    onClose: () => void;
    onMesaje?: (message: string, type: MessageType) => void;
}

export const FormAddProject = ({ onClose, onMesaje }: FormAddProjectProps) => {
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const { mutate: createProjectMutation, isSuccess: isSuccessAddProject, isPending: isPendingAddProject, isError: isErrorAddProject } = useCreateProject();

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>("error");

    const [isOpen, setIsOpen] = useState(true);

    const [newProject, setNewProject] = useState<CreateProject>({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
    });

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const addProject = () => {
        if (
            !newProject.name.trim() ||
            !newProject.description.trim() ||
            !newProject.startDate ||
            !newProject.endDate
        ) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error");
            return;
        }

        if (new Date(newProject.startDate) >= new Date(newProject.endDate)) {
            setMessage("La fecha de inicio debe ser anterior a la fecha de finalización.");
            setMessageType("error");
            return;
        }

        const formattedProject: CreateProject = {
            ...newProject,
            latitude: Number(newProject.latitude),
            longitude: Number(newProject.longitude),
        };

        createProjectMutation(formattedProject);
    };

    useEffect(() => {
        if (isSuccessAddProject) {
            if (onMesaje) {
                onMesaje("Proyecto creado exitosamente!", "success")
            }
            onClose();
            return;
        } else if (isErrorAddProject) {
            if (onMesaje) {
                onMesaje("Error al crear el proyecto. Inténtalo de nuevo.", "error")
            }
            onClose();
            return;
        }
    }, [isSuccessAddProject, isErrorAddProject]);

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
                        {/* Cabecera */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-t-2xl text-white">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Nuevo Proyecto</h3>
                                <button
                                    onClick={handleClose}
                                    className="text-white hover:text-gray-200 focus:outline-none"
                                >
                                    <X />
                                </button>
                            </div>
                        </div>

                        {/* Contenido del formulario */}
                        <div className="p-5">
                            <form className="space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addProject();
                                }}
                            >
                                {/* Nombre del Proyecto */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del proyecto"
                                        name="name"
                                        className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="m-0">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        placeholder="Descripción del proyecto"
                                        name="description"
                                        rows={3}
                                        className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2 m-0">
                                    <div>
                                        <MapModal onSelect={(lat, lng) => {
                                            setCoords({ lat, lng });
                                            setNewProject(prev => ({
                                                ...prev,
                                                latitude: lat.toString(),
                                                longitude: lng.toString()
                                            }));
                                        }} />
                                    </div>
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
                                            name="startDate"
                                            className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            value={newProject.startDate}
                                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            value={newProject.endDate}
                                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                            disabled={isPendingAddProject}
                                        >
                                            {isPendingAddProject ? "Guardando..." : "Guardar Proyecto"}
                                        </button>
                                    </div>
                                </div>
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
                    duration={3000}
                />
            )}
        </>
    );
};
