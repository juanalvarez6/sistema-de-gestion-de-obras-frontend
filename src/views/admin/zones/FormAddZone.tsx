import { useEffect, useState } from "react";
import { MessageModal, MessageType } from "../../../components/MessageModal";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCreateWorkZone } from "../../../hooks/UseWorkZone";
import { CreateWorkZone } from "../../../models/WorkZone";
import { useProjects } from "../../../hooks/UseProjects";

interface FormAddZoneProps {
    onClose: () => void;
    onMesaje?: (message: string, type: MessageType) => void;
}

export const FormAddZone = ({ onClose, onMesaje }: FormAddZoneProps) => {

    const { mutate: createZoneMutation, isError, isSuccess, isPending } = useCreateWorkZone();
    const { data: allProjects } = useProjects();
    const projects = [...(allProjects ?? [])]
        .reverse()
        .filter(project => project.status === 'EN_PROGRESO');

    const [newZone, setNewZone] = useState<CreateWorkZone>({
        projectId: 0,
        name: "",
        description: "",
    })

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<MessageType>("error");
    const [isOpen, setIsOpen] = useState(true);


    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const addZone = () => {
        if (
            newZone.projectId === 0 ||
            !newZone.name.trim() ||
            !newZone.description.trim()
        ) {
            setMessage("Por favor, completa todos los campos.");
            setMessageType("error");
            return;
        }

        createZoneMutation(newZone);
        console.log(newZone);
    }

    useEffect(() => {
        if (isSuccess) {
            if (onMesaje) {
                onMesaje("Zona creada exitosamente!", "success")
            }
            onClose();
            return;
        } else if (isError) {
            if (onMesaje) {
                onMesaje("Error al crear la zona. Inténtalo de nuevo.", "error")
            }
            onClose();
            return;
        }
    }, [isSuccess, isError]);

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
                                    <h3 className="text-lg font-semibold">Nueva Zona</h3>
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
                                        addZone();
                                    }}
                                >

                                    {!projects || projects.length === 0 ? (

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
                                            <input
                                                type="text"
                                                name="sinProyecto"
                                                value="No hay proyectos disponibles"
                                                className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                disabled
                                            />
                                        </div>

                                    ) : (
                                        <>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
                                            <select
                                                name="projectId"
                                                className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all mb-4"
                                                value={newZone.projectId}
                                                onChange={(e) => setNewZone({ ...newZone, projectId: Number(e.target.value) })}
                                                required
                                            >
                                                <option value={0} disabled>
                                                    Selecciona un proyecto
                                                </option>
                                                {projects.map((project, index) => (
                                                    <option key={index} value={project.id}>
                                                        {project.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    )
                                    }
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la zona</label>
                                        <input
                                            type="text"
                                            placeholder="Nombre de la zona"
                                            name="name"
                                            className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            value={newZone.name}
                                            onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                                            required
                                            disabled={!projects || projects.length === 0}
                                        />
                                    </div>

                                    <div className="m-0">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                        <textarea
                                            placeholder="Descripción de la Zona"
                                            name="description"
                                            rows={3}
                                            className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            value={newZone.description}
                                            onChange={(e) => setNewZone({ ...newZone, description: e.target.value })}
                                            required
                                            disabled={!projects || projects.length === 0}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                                disabled={isPending || !projects || projects.length === 0}
                                            >
                                                {isPending ? (
                                                    "Guardando..."
                                                ) : !projects || projects.length === 0 ? (
                                                    "No se Puede guardar"
                                                ) : (
                                                    "Guardar Zona"
                                                )
                                                }
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >
            {message && (
                <MessageModal
                    message={message}
                    type={messageType}
                    onClose={() => setMessage(null)}
                    duration={3000}
                />
            )
            }
        </>
    )
}

export default FormAddZone