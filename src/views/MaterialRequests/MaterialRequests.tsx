import React from 'react';
import '../../index.css'; // Dos puntos para subir dos niveles en la jerarquía de carpetas
import MaterialRequestsForm from './MaterialRequestForm'; // Ajusta la ruta si es necesario

const MaterialRequests = () => {
  return (
    <>
      <h1>Material Requests</h1>
      {/* Aquí insertamos el formulario */}
      <MaterialRequestsForm />  {/* Este es el formulario que se mostrará en la página */}
    </>
  );
}

export default MaterialRequests;
