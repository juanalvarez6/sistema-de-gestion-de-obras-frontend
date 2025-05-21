import { GenericView } from "../../components/GenericView";

const SupervisorView = () => {
  const options = [
    {
      id: 1,
      label: "Proyectos",
      content: "Vista de Proyectos"
    },
    { id: 2, label: "Zonas", content: "Vista de zonas" },
    { id: 3, label: "Materiales", content: "Vista de Materiales" },
    { id: 4, label: "Inventario", content: "Vista de inventario" },
    { id: 5, label: "Tareas", content: "Vista de Tareas" },
    { id: 6, label: "Solicitudes de Materiales", content: "Vista de Solicitudes de Materiales" },
    { id: 7, label: "Reportes", content: "Vista de Reportes" },

  ];

  return (
    <GenericView
      title="Sistema de Gestión"
      options={options}
      localStorageKey="SelectedOptionSupervisor"
    />
  )
}

export default SupervisorView