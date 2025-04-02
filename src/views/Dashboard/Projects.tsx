import { useState } from "react";

interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  estado: "EN_PROGRESO" | "FINALIZADO" | "SUSPENDIDO";
}

// Datos de ejemplo
const initialProjects: Project[] = [
  { id: 1, nombre: "Edificio A", descripcion: "Construcción de 10 pisos", estado: "EN_PROGRESO" },
  { id: 2, nombre: "Puente B", descripcion: "Puente vehicular de 2km", estado: "FINALIZADO" },
  { id: 3, nombre: "Hospital C", descripcion: "Nuevo hospital de 500 camas", estado: "SUSPENDIDO" },
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [newProject, setNewProject] = useState({ nombre: "", descripcion: "", estado: "EN_PROGRESO" });

  const filteredProjects = projects
    .filter((p) => p.nombre.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filterEstado ? p.estado === filterEstado : true));

  const addProject = () => {
    if (!newProject.nombre.trim() || !newProject.descripcion.trim()) return;
    const newId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    setProjects([...projects, { id: newId, ...newProject }]);
    setNewProject({ nombre: "", descripcion: "", estado: "EN_PROGRESO" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Proyectos</h2>

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="w-full px-3 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md"
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="EN_PROGRESO">En Progreso</option>
          <option value="FINALIZADO">Finalizado</option>
          <option value="SUSPENDIDO">Suspendido</option>
        </select>
      </div>

      {/* Tabla de Proyectos */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length ? (
            filteredProjects.map((project) => (
              <tr key={project.id} className="text-center border">
                <td className="border p-2">{project.nombre}</td>
                <td className="border p-2">{project.descripcion}</td>
                <td className="border p-2">{project.estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-gray-500 text-center">
                No hay proyectos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulario para Agregar Proyecto */}
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Agregar Nuevo Proyecto</h3>
        <input
          type="text"
          placeholder="Nombre del Proyecto"
          className="w-full px-3 py-2 border rounded-md mb-2"
          value={newProject.nombre}
          onChange={(e) => setNewProject({ ...newProject, nombre: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          className="w-full px-3 py-2 border rounded-md mb-2"
          value={newProject.descripcion}
          onChange={(e) => setNewProject({ ...newProject, descripcion: e.target.value })}
        />
        <select
          className="w-full px-3 py-2 border rounded-md mb-2"
          value={newProject.estado}
          onChange={(e) => setNewProject({ ...newProject, estado: e.target.value })}
        >
          <option value="EN_PROGRESO">En Progreso</option>
          <option value="FINALIZADO">Finalizado</option>
          <option value="SUSPENDIDO">Suspendido</option>
        </select>
        <button
          onClick={addProject}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Agregar Proyecto
        </button>
      </div>
    </div>
  );
}

export default Projects;