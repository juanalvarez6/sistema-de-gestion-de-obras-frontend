import { useState } from "react";
import { Link } from "react-router-dom";
import TaskList from '../../components/TaskList';
import Task from "../../models/Task";
import AttendanceForm from "./AttendanceForm";

const WorkerPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const tasks: Task[] = [
    {
      id: 1,
      zone: { idZone: 103, name: "Zona 1", locationName: "Avenida Central, Cali", latitude: 3.4516, longitude: -76.5320 },
      user: { id: 1, name: "Juan Pérez", email: "juan@example.com", password: "1234", rol: "Trabajador" },
      description: "🔨 Reparar muro en sector 3",
      status: "en curso",
      assignmentDate: new Date("2025-03-10"),
      completionDate: new Date("2025-03-15"),
      priority: "baja"
    },
    {
      id: 2,
      zone: { idZone: 103, name: "Zona 1", locationName: "Avenida Central, Cali", latitude: 3.4516, longitude: -76.5320 },
      user: { id: 1, name: "Juan Pérez", email: "juan@example.com", password: "1234", rol: "Trabajador" },
      description: "🔧 Instalar tuberías en baño 2",
      status: "pendiente",
      assignmentDate: new Date("2025-03-11"),
      completionDate: new Date("2025-03-20"),
      priority: "media"
    },
  ];

  // Lista de materiales solicitados con su estado
  const materialRequests = [
    { material: "Madera", quantity: 5, status: "Aprobado" },
    { material: "Cemento", quantity: 3, status: "Pendiente" },
  ];

  return (
    <div className="bg-gray-100">
      <h1>Dashboard Worker</h1>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 rounded-lg hover:bg-red-300"
            >
              ✖
            </button>
            <AttendanceForm />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Registro de Asistencia</h2>
          <p className="text-gray-700">Ubicación actual: <span className="font-bold">Zona A - Obra 12</span></p>
          <p className="text-gray-700">Horas trabajadas hoy: <span className="font-bold">5h 30m</span></p>
          <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-lg w-full">Marcar Entrada/Salida</button>
        </div>

        <div className="mb-6">
          <TaskList tasks={tasks}></TaskList>
          <Link to='/task-management' className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full block text-center">Ver lista de tareas</Link>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Materiales Solicitados</h2>
          {/* Mostrar materiales con estado */}
          {materialRequests.map((request, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg mb-2">
              <p className="font-semibold">{request.material} - {request.quantity} unidades</p>
              <p className="text-sm text-gray-600">
                Estado: 
                {/* Cambiar icono según el estado */}
                {request.status === "Aprobado" ? (
                  <span className="text-green-500">🟢 Aprobado</span>
                ) : request.status === "Pendiente" ? (
                  <span className="text-yellow-500">⏳ Pendiente</span>
                ) : (
                  <span className="text-red-500">🔴 Rechazado</span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Comunicaciones</h2>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="font-semibold">Aviso: Hoy habrá inspección de seguridad a las 3:00 PM.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Reporte de Avance</h2>
          <p className="text-gray-700">Tareas completadas esta semana: <span className="font-bold">8</span></p>
          <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
            <div className="bg-blue-500 h-4 rounded-full" ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerPanel;
