const AttendanceForm = () => {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Marcar Entrada/Salida</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> Trabajador</label>
          <input type="text" className="w-full mt-1 p-2 border rounded-lg bg-gray-100" disabled value="Juan Pérez" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> Zona Asignada</label>
          <input type="text" className="w-full mt-1 p-2 border rounded-lg bg-gray-100" disabled value="Zona Norte - Calle 12, Bogotá" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> Fecha</label>
          <input type="date" className="w-full mt-1 p-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> Hora de Entrada</label>
          <input type="time" className="w-full mt-1 p-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> Hora de Salida</label>
          <input type="time" className="w-full mt-1 p-2 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700"> Ubicación Actual</label>
          <div className="flex justify-around ">
            <input type="text" className="m-1 p-2 border rounded-lg bg-gray-100 w-1/2" disabled value="4.6097, -74.0817" />
            <button className=" bg-green-400 hover:bg-green-500 p-1 rounded-lg w-1/2">Obtener Ubicación</button>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mr-2">
            Marcar Entrada
          </button>
          <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Marcar Salida
          </button>
        </div>
      </div>
    );
  };

  export default AttendanceForm;