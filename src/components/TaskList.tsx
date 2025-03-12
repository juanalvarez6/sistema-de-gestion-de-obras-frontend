import { useState, useEffect } from "react";
import Task from '../models/Task';

const taskStatusOptions = {
  pendiente: { text: "🔵 Pendiente", color: "text-blue-600" },
  "en curso": { text: "🟢 En curso", color: "text-green-600" },
  completada: { text: "✅ Completada", color: "text-gray-600" },
};

const priorityOptions = {
  alta: { text: "🔴 Alta", color: "text-red-600" },
  media: { text: "🟡 Media", color: "text-yellow-600" },
  baja: { text: "🟢 Baja", color: "text-green-600" },
};

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleStatusChange = (id: number, newStatus: Task["status"]) => {
    setTaskList(taskList.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Mis Tareas</h2>
      {taskList.map(task => (
        <div key={task.id} className="bg-gray-200 p-4 rounded-lg mb-2">
          <p className="font-semibold">{task.description}</p>
          <p className={`text-sm ${taskStatusOptions[task.status].color}`}>
            Estado: {taskStatusOptions[task.status].text}
          </p>
          <p className={`text-sm ${priorityOptions[task.priority].color}`}>
            Prioridad: {priorityOptions[task.priority].text}
          </p>
          <p className="text-xs text-gray-500">
            Zona: {task.zone.name} ({task.zone.locationName})
          </p>
          <p className="text-xs text-gray-500">
            Trabajador: {task.user.name}
          </p>
          <p className="text-xs text-gray-500">
            Asignada: {new Date(task.assignmentDate).toLocaleDateString()}
          </p>
          <select
            className="mt-2 p-1 border rounded-lg w-full"
            value={task.status}
            onChange={e => handleStatusChange(task.id, e.target.value as Task["status"])}
          >
            <option value="pendiente">🔵 Pendiente</option>
            <option value="en curso">🟢 En curso</option>
            <option value="completada">✅ Completada</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default TaskList;