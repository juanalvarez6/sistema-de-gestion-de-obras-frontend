import { GenericView } from "../../components/GenericView";
import {
  FolderKanban,
  Map,
  Boxes,
  Warehouse,
  FileInput,
  BarChartBig,
  CheckSquare,
} from "lucide-react";


const SupervisorView = () => {
  const options = [
    { id: 1, label: "Proyectos", icon: <FolderKanban size={20} />, content: "Vista de Proyectos" },
    { id: 2, label: "Zonas", icon: <Map size={20} />, content: "Vista de zonas" },
    { id: 3, label: "Materiales", icon: <Boxes size={20} />, content: "Vista de Materiales" },
    { id: 4, label: "Inventario", icon: <Warehouse size={20} />, content: "Vista de inventario" },
    { id: 5, label: "Tareas", icon: <CheckSquare size={20} />, content: "Vista de Tareas" },
    { id: 6, label: "Solicitudes de Materiales", icon: <FileInput size={20} />, content: "Vista de Solicitudes de Materiales" },
    { id: 7, label: "Reportes", icon: <BarChartBig size={20} />, content: "Vista de Reportes" },
  ];


  return (
    <GenericView
      options={options}
    />
  )
}

export default SupervisorView