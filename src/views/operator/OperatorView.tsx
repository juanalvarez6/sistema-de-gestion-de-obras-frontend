import { Boxes } from "lucide-react";
import { GenericView } from "../../components/GenericView"
import MaterialRequests from "../MaterialRequests/MaterialRequests";

const OperatorView = () => {
  const options = [
    { id: 2, label: "Materiales", icon: <Boxes size={20} />, content: <MaterialRequests/> },
  ];

  return (
    <GenericView
      options={options}
    />
  )
}

export default OperatorView