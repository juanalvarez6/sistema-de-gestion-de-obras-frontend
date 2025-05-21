import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MessageModal, MessageType } from "../../../components/MessageModal";
import { useUpdateWorkZone } from "../../../hooks/UseWorkZone";
import { WorkZone } from "../../../models/WorkZone";
import { useProjects } from "../../../hooks/UseProjects";

interface FormEditZoneProps {
  zone: WorkZone;
  onClose: () => void;
  onMesaje?: (message: string, type: MessageType) => void;
}

export const FormEditZone = ({ zone, onClose, onMesaje }: FormEditZoneProps) => {
  const { mutate: updateZoneMutation, isError, isSuccess, isPending } = useUpdateWorkZone();
  const { data: allProjects } = useProjects();

  const projects = [...(allProjects ?? [])]
    .reverse()
    .filter(project => project.status === 'EN_PROGRESO');

  const [editZone, setEditZone] = useState({
    projectId: zone.project.id,
    name: zone.name,
    description: zone.description,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>("error");
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const updateZone = () => {
    if (
      editZone.projectId === 0 ||
      !editZone.name.trim() ||
      !editZone.description.trim()
    ) {
      setMessage("Por favor, completa todos los campos.");
      setMessageType("error");
      return;
    }

    updateZoneMutation({
        id: zone.id,
        data: editZone
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onMesaje?.("Zona actualizada exitosamente!", "success");
      onClose();
    } else if (isError) {
      onMesaje?.("Error al actualizar la zona. Inténtalo de nuevo.", "error");
      onClose();
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
              transition={{ type: "spring", damping: 20, stiffness: 300, bounce: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-auto"
            >
              {/* Cabecera */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-t-2xl text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Editar Zona</h3>
                  <button onClick={handleClose} className="text-white hover:text-gray-200 focus:outline-none">
                    <X />
                  </button>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateZone();
                  }}
                >
                  {/* Proyecto */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
                    <select
                      name="projectId"
                      className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={editZone.projectId}
                      onChange={(e) =>
                        setEditZone({ ...editZone, projectId: Number(e.target.value) })
                      }
                      required
                    >
                      <option value={0} disabled>Selecciona un proyecto</option>
                      {projects.map((project, index) => (
                        <option key={index} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la zona</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre de la zona"
                      value={editZone.name}
                      onChange={(e) => setEditZone({ ...editZone, name: e.target.value })}
                      className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="description"
                      placeholder="Descripción de la zona"
                      rows={3}
                      value={editZone.description}
                      onChange={(e) => setEditZone({ ...editZone, description: e.target.value })}
                      className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {/* Botón */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                      disabled={isPending}
                    >
                      {isPending ? "Actualizando..." : "Actualizar Zona"}
                    </button>
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

export default FormEditZone;