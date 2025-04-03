import { useState } from "react";
import { useWorkZones } from "../../../hooks/UseWorkZone";
import FormDeleteWorkZone from "./FromDeleteWorkZone";
import FormAddWorkZone from "./FormAddWorkZone";
import FormEditWorkZone from "./FormEditWorkZone";

const WorkZonesList = () => {
    const { data: workZones, isLoading, isError } = useWorkZones();
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredWorkZones = (workZones || [])
        .filter((zone) => zone.name.toLowerCase().includes(search.toLowerCase()))
        .filter((zone) => (filterStatus ? zone.status === filterStatus : true));

    const totalPages = Math.ceil(filteredWorkZones.length / itemsPerPage);
    const paginatedWorkZones = filteredWorkZones.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gestión de Zonas de Trabajo</h2>

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
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="EN_PROGRESO">En Progreso</option>
                    <option value="FINALIZADA">Finalizada</option>
                </select>
            </div>

            {/* Tabla */}
            {isLoading ? (
                <p className="text-center text-gray-500">Cargando zonas de trabajo...</p>
            ) : isError ? (
                <p className="text-center text-red-500">Error al cargar las zonas</p>
            ) : (
                <>
                    <FormAddWorkZone></FormAddWorkZone>
                    <table className="w-full border-collapse border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Nombre</th>
                                <th className="border p-2">Descripción</th>
                                <th className="border p-2">Proyecto</th>
                                <th className="border p-2">Estado</th>
                                <th className="border p-2">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedWorkZones.length ? (
                                paginatedWorkZones.map((zone) => (
                                    <tr key={zone.id} className="text-center border">
                                        <td className="border p-2">{zone.id}</td>
                                        <td className="border p-2">{zone.name}</td>
                                        <td className="border p-2">{zone.description}</td>
                                        <td className="border p-2">{zone.project.name}</td>
                                        <td className="border p-2">{zone.status}</td>
                                        <td className="justify-around items-center">
                                            <FormEditWorkZone workZone={zone}></FormEditWorkZone>
                                            <FormDeleteWorkZone workZoneId={zone.id}></FormDeleteWorkZone>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-4 text-gray-500 text-center">
                                        No hay zonas que coincidan con la búsqueda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="flex justify-between">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2">Página {currentPage} de {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkZonesList;