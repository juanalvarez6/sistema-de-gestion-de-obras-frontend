import { useState } from "react";
import { useProjects } from "../../../hooks/UseProjects";
import FormAddProject from "./FormAddProject";
import FormEditProject from "./FormEditProject";
import FormDeleteProject from "./FormDeleteProject";

const ProjectList = () => {
  const { data: projects, isLoading, isError } = useProjects();

  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = (projects || [])
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filterEstado ? p.status === filterEstado : true));

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      </div>
      <FormAddProject></FormAddProject>
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
                    <FormEditProject project={project}></FormEditProject>
                    <FormDeleteProject projectId={project.id}></FormDeleteProject>
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
        </>
      )}
    </div>
  );
};

export default ProjectList;