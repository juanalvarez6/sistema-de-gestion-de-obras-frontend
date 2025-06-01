import { ProjectViewAdmin } from "./projects/ProjectViewAdmin";
import { ZoneViewAdmin } from "./zones/ZoneViewAdmin";
import { GenericView } from "../../components/GenericView";
import UsersView from "./users/UsersView";
import { Map, BarChartBig, Boxes, CalendarCheck2, FileInput, FolderKanban, Users, Warehouse } from "lucide-react";

const AdminView = () => {
  const options = [
    { id: 1, label: "Usuarios", icon: <Users size={20} />, content: <UsersView /> },
    { id: 2, label: "Proyectos", icon: <FolderKanban size={20} />, content: <ProjectViewAdmin /> },
    { id: 3, label: "Zonas", icon: <Map size={20} />, content: <ZoneViewAdmin /> },
    { id: 4, label: "Materiales", icon: <Boxes size={20} />, content: "Vista de Materiales" },
    { id: 5, label: "Inventario", icon: <Warehouse size={20} />, content: "Vista de inventario" },
    { id: 6, label: "Asistencias", icon: <CalendarCheck2 size={20} />, content: "Vista de Asistencias" },
    { id: 7, label: "Solicitudes de Materiales", icon: <FileInput size={20} />, content: "Vista de Solicitudes de Materiales" },
    { id: 8, label: "Reportes", icon: <BarChartBig size={20} />, content: "Vista de Reportes" },
  ];


  return (
    <GenericView
      options={options}
    />
  );
};

export default AdminView;