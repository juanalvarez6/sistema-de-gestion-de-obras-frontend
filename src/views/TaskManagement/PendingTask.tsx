import React, { useState } from "react";

const PendingTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Revisión de planos", description: "Verificar planos estructurales", status: "pendiente", priority: "alta" },
    { id: 2, title: "Compra de materiales", description: "Comprar cemento y acero", status: "en progreso", priority: "media" },
  ]);

  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "baja" });
  const [filter, setFilter] = useState("todas");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const newTaskObj = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      status: "pendiente",
      priority: newTask.priority,
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", description: "", priority: "baja" }); // Limpiar el formulario
  };

  const updateTaskStatus = (id: number, newStatus: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = filter === "todas" ? tasks : tasks.filter(task => task.status === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-red-200";
      case "media": return "bg-yellow-200";
      case "baja": return "bg-green-200";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Tareas Pendientes</h2>

      {/* Filtro de tareas */}
      <div className="mb-4">
        <label className="block text-lg text-gray-600 mb-2">Filtrar por estado:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg w-full"
        >
          <option value="todas">Todas</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      {/* Formulario para agregar nuevas tareas */}
      <form onSubmit={handleAddTask} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Agregar Tarea
        </button>
      </form>

      {/* Lista de tareas */}
      <ul className="space-y-4">
        {filteredTasks.map(task => (
          <li key={task.id} className={`p-4 border rounded-lg flex justify-between items-center ${getPriorityColor(task.priority)}`}>
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-700 font-semibold">Prioridad: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </select>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingTasks;

