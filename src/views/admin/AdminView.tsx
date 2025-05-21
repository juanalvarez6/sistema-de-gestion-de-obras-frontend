import { ProjectViewAdmin } from "./projects/ProjectViewAdmin";
import { ZoneViewAdmin } from "./zones/ZoneViewAdmin";
import { GenericView } from "../../components/GenericView";
import UsersView from "./users/UsersView";

const AdminView = () => {
  const options = [
    { id: 1, label: "Usuarios", content: <UsersView/> },
    { id: 2, label: "Proyectos", content: <ProjectViewAdmin /> },
    { id: 3, label: "Zonas", content: <ZoneViewAdmin /> },
    { id: 4, label: "Materiales", content: "Vista de Materiales" },
    { id: 5, label: "Inventario", content: "Vista de inventario" },
    { id: 6, label: "Asistencias", content: "Vista de Asistencias" },
    { id: 7, label: "Solicitudes de Materiales", content: "Vista de Solicitudes de Materiales" },
    { id: 8, label: "Reportes", content: "Vista de Reportes" },
  ];

  return (
    <GenericView
      title="Sistema de Gestión"
      options={options}
      localStorageKey="SelectedOptionAdmin"
    />
  );
};

export default AdminView;