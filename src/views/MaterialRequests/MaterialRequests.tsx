import MaterialRequestsForm from './MaterialRequestForm'; // Ajusta la ruta si es necesario

const MaterialRequests = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 mt-12" >Materiales</h1>
      {/* Aquí insertamos el formulario */}
      <MaterialRequestsForm />  {/* Este es el formulario que se mostrará en la página */}
      </div>
  );
}

export default MaterialRequests;
