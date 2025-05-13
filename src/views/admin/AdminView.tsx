import { useState } from "react";
import { ProjectView } from "./projects/ProjectView";

const AdminView = () => {
    const options = [
        { id: 1, label: "Usuarios", content: "Bienvenido a la página de inicio" },
        {
            id: 2,
            label: "Proyectos",
            content: <ProjectView />,
        },
        { id: 3, label: "Zonas", content: "Vista de zonas" },
        { id: 4, label: "Materiales", content: "Vista de Materiales" },
        { id: 5, label: "Inventario", content: "Vista de inventario" },
        { id: 6, label: "Asistencias", content: "Vista de Asistencias" },
        { id: 7, label: "Solicitudes de Materiales", content: "Vista de Solicitudes de Materiales" },
        { id: 8, label: "Reportes", content: "Vista de Reportes" },

    ];
    const [selected, setSelected] = useState(options[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 py-8">
            {/* Contenedor principal centrado con ancho máximo */}
            <div className="max-w-6xl mx-auto">
                {/* Encabezado - ahora en columna para mejor alineación */}
                <div className="flex flex-col items-center mb-8">
                    {/* Contenedor del título y botón hamburguesa */}
                    <div className="w-full flex justify-between items-center md:justify-center mb-4 md:mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Sistema De Gestión</h1>

                        {/* Botón de hamburguesa solo en móviles */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-md text-blue-600 hover:bg-blue-100 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Menú */}
                    <div
                        className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full text-center`}
                    >
                        <div className="inline-flex flex-wrap justify-center gap-4">
                            {options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setSelected(option);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow
                        ${selected.id === option.id
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-xl md:max-w-6xl text-center">
                    <div className="text-gray-600 text-lg">
                        {typeof selected.content === 'string' ? (
                            <p>{selected.content}</p>
                        ) : (
                            selected.content
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminView