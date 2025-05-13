import { useEffect, useState } from "react";
import { useDeleteProject } from "../../../hooks/UseProjects";
import { MessageType } from "../../../components/MessageModal";
import { AnimatePresence, motion } from "framer-motion";

interface FormDeleteProjectProps {
    projectId: number;
    onClose: () => void;
    onMesaje?: (message: string, type: MessageType) => void;
}

export const FormDeleteProject = ({ projectId, onClose, onMesaje }: FormDeleteProjectProps) => {
    const {
        mutate: deleteProjectMutation,
        isPending: isPendingDelete,
        isSuccess: isSuccessDelete,
        isError: isErrorDelete,
    } = useDeleteProject();

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleDelete = () => {
        deleteProjectMutation(projectId);
    };

    useEffect(() => {
        if (isSuccessDelete) {
            if (onMesaje) {
                onMesaje("Proyecto eliminado correctamente.", "success");
            }
            onClose();
        } else if (isErrorDelete) {
            if (onMesaje) {
                onMesaje("Error al eliminar el proyecto.", "error");
            }
            onClose();
        }
    }, [isSuccessDelete, isErrorDelete]);

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
                            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-t-2xl text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Eliminar Proyecto</h3>
                                    <button
                                        onClick={handleClose}
                                        className="text-white hover:text-gray-200 focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <p className="text-gray-700 text-center text-base">
                                    ¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.
                                </p>

                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={handleClose}
                                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        disabled={isPendingDelete}
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                    >
                                        {isPendingDelete ? "Eliminando..." : "Eliminar"}
                                    </button>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};