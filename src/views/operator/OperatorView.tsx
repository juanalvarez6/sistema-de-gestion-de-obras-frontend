import { Boxes } from "lucide-react";
import { GenericView } from "../../components/GenericView"

const OperatorView = () => {
  const options = [
    { id: 2, label: "Materiales", icon: <Boxes size={20} />, content: "Vista de Materiales" },
  ];

  return (
    <GenericView
      options={options}
      localStorageKey="SelectedOptionAdmin"
    />
  )
}

export default OperatorView