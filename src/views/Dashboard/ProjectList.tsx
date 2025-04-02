import { useState } from "react";
import { CreateProject } from "../../models/Project";
import { useProjects, useCreateProject } from "../../hooks/UseProjects";

const ProjectList = () => {
  const { data: projects, isLoading, isError } = useProjects();
  const createProjectMutation = useCreateProject();

  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const [newProject, setNewProject] = useState<CreateProject>({
    name: "",
    description: "",
    latitude: "40.7128",
    longitude: "-74.006",
    startDate: "",
    endDate: "",
    status: "EN_PROGRESO",
  });

  const filteredProjects = (projects || [])
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filterEstado ? p.status === filterEstado : true));

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const addProject = () => {
    if (!newProject.name.trim() || !newProject.description.trim()) return;

    const formattedProject: CreateProject = {
      ...newProject,
      latitude: Number(newProject.latitude),
      longitude: Number(newProject.longitude),
    };

    createProjectMutation.mutate(formattedProject);
    setNewProject({
      name: "",
      description: "",
      latitude: "",
      longitude: "",
      startDate: "",
      endDate: "",
      status: "EN_PROGRESO",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Proyectos</h2>

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <input type="text" placeholder="Buscar por nombre..." className="w-full px-3 py-2 border rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="px-3 py-2 border rounded-md" value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
          <option value="">Todos</option>
          <option value="EN_PROGRESO">En Progreso</option>
          <option value="FINALIZADO">Finalizado</option>
          <option value="SUSPENDIDO">Suspendido</option>
        </select>
      </div>

      <div className="flex">
        <button
          onClick={() => setIsModalOpen(true)}
          className=" bg-blue-500 text-white px-4 py-2 rounded-md m-2 hover:bg-blue-600"
        >
          Agregar Proyecto
        </button>
      </div>

      {/* Tabla de Proyectos */}
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando proyectos...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error al cargar proyectos</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Fecha Inicio</th>
                <th className="border p-2">Fecha Fin</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Fecha de Creación</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.length ? (
                currentProjects.map((project) => (
                  <tr key={project.id} className="text-center border">
                    <td className="border p-2">{project.id}</td>
                    <td className="border p-2">{project.name}</td>
                    <td className="border p-2">{project.description}</td>
                    <td className="border p-2">{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(project.endDate).toLocaleDateString()}</td>
                    <td className="border p-2">{project.status}</td>
                    <td className="border p-2">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="justify-around items-center">
                      <button className="m-1.5" onClick={() => alert('btn-edit')}>
                        <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                      </button>
                      <button className="m-1.5" onClick={() => alert('btn-delete')}>
                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-gray-500 text-center">No hay proyectos disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="flex justify-between items-center mb-4">
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
              ← Anterior
            </button>
            <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
              Siguiente →
            </button>
          </div>

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
                  disabled={isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar"}
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
      )}
    </div>
  );
};

export default ProjectList;