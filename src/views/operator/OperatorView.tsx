import { Boxes } from "lucide-react";
import { GenericView } from "../../components/GenericView"
import TaskManagement from "../TaskManagement/TaskManagement";

const OperatorView = () => {
  const options = [
    { id: 2, label: "Materiales", icon: <Boxes size={20} />, content: <TaskManagement/> },
  ];

  return (
    <GenericView
      options={options}
    />
  )
}

export default OperatorView