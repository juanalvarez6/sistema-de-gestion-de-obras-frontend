import React, { useState } from 'react';

const MaterialRequests = () => {
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [preferredOption, setPreferredOption] = useState('');
  const [comments, setComments] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ material?: string; quantity?: string }>({});

  const validateForm = () => {
    let newErrors: { material?: string; quantity?: string } = {};
    if (!material) newErrors.material = 'Debe seleccionar un material.';
    if (!quantity || parseFloat(quantity) <= 0) newErrors.quantity = 'La cantidad debe ser mayor a 0.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newRequest = {
        material,
        quantity,
        unit,
        preferredOption,
        comments,
        deliveryDate,
        status: 'Pendiente',
      };
      setRequests([...requests, newRequest]);
      alert('Solicitud enviada con éxito ✅');

      // Limpiar formulario
      setMaterial('');
      setQuantity('');
      setUnit('kg');
      setPreferredOption('');
      setComments('');
      setDeliveryDate('');
      setErrors({});
    }
  };

  const updateStatus = (index: number, status: string) => {
    const updated = [...requests];
    updated[index].status = status;
    setRequests(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header y botón */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Gestión de Materiales
            </span>
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Ver Solicitudes
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* Tarjeta del formulario */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Solicitud de Materiales</h2>
              <p className="text-gray-600 mt-2">Complete el formulario para solicitar materiales de construcción</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sección de Material */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="material" className="text-sm font-medium text-gray-700 mb-1">Material</label>
                  <select
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className={`p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.material ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 hover:border-blue-400'
                    }`}
                  >
                    <option value="">Seleccione material</option>
                    <option value="cemento">Cemento</option>
                    <option value="ladrillos">Ladrillos</option>
                    <option value="acero">Acero</option>
                    <option value="madera">Madera</option>
                    <option value="grava">Grava</option>
                    <option value="arena">Arena</option>
                    <option value="yeso">Yeso</option>
                    <option value="pintura">Pintura</option>
                    <option value="tubos-pvc">Tubos de PVC</option>
                    <option value="aislantes">Aislantes</option>
                  </select>
                  {errors.material && <p className="text-red-500 text-xs mt-1">{errors.material}</p>}
                </div>

                {/* Cantidad y Unidad */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className={`p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 hover:border-blue-400'
                      }`}
                      min="1"
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="unit" className="text-sm font-medium text-gray-700 mb-1">Unidad</label>
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all"
                    >
                      <option value="kg">Kilogramos</option>
                      <option value="lb">Libras</option>
                      <option value="m3">Metros cúbicos</option>
                      <option value="unidad">Unidad</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Opción preferida */}
              <div className="flex flex-col">
                <label htmlFor="preferredOption" className="text-sm font-medium text-gray-700 mb-1">Calidad preferida</label>
                <select
                  id="preferredOption"
                  value={preferredOption}
                  onChange={(e) => setPreferredOption(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all"
                >
                  <option value="">Seleccione opción</option>
                  <option value="alta">Alta (Materiales premium)</option>
                  <option value="media">Media (Calidad estándar)</option>
                  <option value="baja">Baja (Económico)</option>
                </select>
              </div>

              {/* Comentarios */}
              <div className="flex flex-col">
                <label htmlFor="comments" className="text-sm font-medium text-gray-700 mb-1">Comentarios</label>
                <textarea
                  id="comments"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all"
                  placeholder="Detalles adicionales sobre la solicitud..."
                />
              </div>

              {/* Fecha de entrega */}
              <div className="flex flex-col">
                <label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700 mb-1">Fecha estimada de entrega</label>
                <input
                  type="date"
                  id="deliveryDate"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition-all"
                />
              </div>

              {/* Botón de Enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full relative overflow-hidden group bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    Enviar Solicitud
                  </span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white w-11/12 max-w-6xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Historial de Solicitudes</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="overflow-auto p-6">
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calidad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((req, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.material}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.unit}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{req.preferredOption}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            req.status === 'Aprobado' ? 'bg-green-100 text-green-800' :
                            req.status === 'Rechazado' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                          <button
                            onClick={() => updateStatus(index, 'Aprobado')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Aprobar
                          </button>
                          <button
                            onClick={() => updateStatus(index, 'Rechazado')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Rechazar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {requests.length === 0 && (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No hay solicitudes</h3>
                  <p className="mt-1 text-sm text-gray-500">No se han registrado solicitudes de materiales aún.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialRequests;