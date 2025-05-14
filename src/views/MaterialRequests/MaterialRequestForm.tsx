
import React, { useState } from 'react';
import { useMaterialRequests } from '../../context/MaterialRequestsContext';
import { motion, AnimatePresence } from 'framer-motion';

const MaterialRequestForm = () => {
  const { requests, addRequest, updateRequest, deleteRequest } = useMaterialRequests();
  const [formData, setFormData] = useState({
    material: '',
    quantity: '',
    unit: 'kg',
    preferredOption: '',
    comments: '',
    deliveryDate: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ material?: string; quantity?: string }>({});

  const validateForm = () => {
    let newErrors: { material?: string; quantity?: string } = {};
    if (!formData.material) newErrors.material = 'Material requerido';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) newErrors.quantity = 'Cantidad inválida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addRequest({ ...formData, status: 'Pendiente' });
      alert('Solicitud enviada con éxito ✅');
      setFormData({
        material: '',
        quantity: '',
        unit: 'kg',
        preferredOption: '',
        comments: '',
        deliveryDate: '',
      });
      setErrors({});
    }
  };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  // Mapeo de materiales con su unidad predeterminada
  const unitByMaterial: { [key: string]: string } = {
    Cemento: 'kg',
    Ladrillos: 'unidad',
    Acero: 'kg',
    Madera: 'm3',
    Grava: 'kg',
    Arena: 'kg',
    Yeso: 'kg',
    Pintura: 'litros',
    'Tubos PVC': 'unidad',
  };

  if (name === 'material') {
    setFormData(prev => ({
      ...prev,
      material: value,
      unit: unitByMaterial[value] || prev.unit, // cambia la unidad si existe en el mapa
    }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};


  const updateRequestStatus = (index: number, status: string) => {
    const updatedRequest = { ...requests[index], status };
    updateRequest(index, updatedRequest);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Layout de dos columnas */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Formulario principal */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Nueva Solicitud</h2>
                <p className="text-sm text-gray-500">Complete todos los campos requeridos</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Material */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.material ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Seleccione un material...</option>
                      <option value="Cemento">Cemento</option>
                      <option value="Ladrillos">Ladrillos</option>
                      <option value="Acero">Acero</option>
                      <option value="Madera">Madera</option>
                      <option value="Grava">Grava</option>
                      <option value="Arena">Arena</option>
                      <option value="Yeso">Yeso</option>
                      <option value="Pintura">Pintura</option>
                      <option value="Tubos PVC">Tubos PVC</option>
                    </select>
                    {errors.material && (
                      <p className="mt-1 text-sm text-red-600">{errors.material}</p>
                    )}
                  </div>
                </div>

                {/* Cantidad y Unidad */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${errors.quantity ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="0.00"
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled
                    >
                      <option value="kg">Kilogramos</option>
                      <option value="lb">Libras</option>
                      <option value="m3">m³</option>
                      <option value="unidad">Unidad</option>
                    </select>
                  </div>
                </div>

                {/* Calidad y Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calidad</label>
                    <select
                      name="preferredOption"
                      value={formData.preferredOption}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Seleccione calidad...</option>
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-7 00 mb-1">Fecha de entrega</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Comentarios */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios</label>
                  <textarea
                    name="comments"
                    rows={3}
                    value={formData.comments}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Detalles adicionales..."
                  />
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Ver solicitudes
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Panel de información */}
          <div className="md:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Instrucciones</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Seleccione el material requerido</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Especifique cantidad y unidad de medida</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Indique calidad preferida si aplica</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Agregue fecha de entrega estimada</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Solicitudes recientes</h4>
                <p className="text-xs text-blue-600">
                  Tienes {requests.length} solicitudes {requests.length > 0 ? `(${requests.filter(r => r.status === 'Pendiente').length} pendientes)` : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Versión original */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Historial de Solicitudes</h3>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                  {requests.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="mt-4 text-gray-500">No hay solicitudes registradas</p>
                    </motion.div>
                  ) : (
                    requests.map((req, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium text-gray-800">{req.material}</span>
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                              req.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                              req.status === 'Aprobado' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {req.status}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteRequest(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            {req.quantity} {req.unit}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {req.preferredOption || 'No especificada'}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {req.deliveryDate || 'No especificada'}
                          </div>
                        </div>
                        
                        {req.comments && (
                          <div className="mt-2 text-sm text-gray-600 flex">
                            <svg className="w-4 h-4 mr-1 mt-0.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span className="italic">{req.comments}</span>
                          </div>
                        )}
                        
                        <div className="flex gap-2 mt-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateRequestStatus(index, 'Aprobado')}
                            className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors duration-200"
                          >
                            Aprobar
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateRequestStatus(index, 'Rechazado')}
                            className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-200"
                          >
                            Rechazar
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateRequestStatus(index, 'Pendiente')}
                            className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition-colors duration-200"
                          >
                            Pendiente
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MaterialRequestForm;