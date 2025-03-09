import React, { useState } from 'react';

const MaterialRequestsForm = () => {
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg'); // Default to kilograms
  const [preferredOption, setPreferredOption] = useState('');
  const [errors, setErrors] = useState<{ material?: string; quantity?: string }>({});

  const validateForm = () => {
    let newErrors: { material?: string; quantity?: string } = {};

    if (!material) {
      newErrors.material = 'Debe seleccionar un material.';
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({ material, quantity, unit, preferredOption });
      alert('Solicitud enviada con éxito ✅');
      
      // Limpiar el formulario después del envío exitoso
      setMaterial('');
      setQuantity('');
      setUnit('kg');
      setPreferredOption('');
      setErrors({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-5">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Solicitud de Materiales</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Material */}
        <div className="flex flex-col">
          <label htmlFor="material" className="text-lg text-gray-600 mb-2">Selecciona el material</label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.material ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
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
          {errors.material && <p className="text-red-500 text-sm mt-1">{errors.material}</p>}
        </div>

        {/* Cantidad y Unidad */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col md:w-2/3">
            <label htmlFor="quantity" className="text-lg text-gray-600 mb-2">Cantidad</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              min="1"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>

          <div className="flex flex-col md:w-1/3">
            <label htmlFor="unit" className="text-lg text-gray-600 mb-2">Unidad</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="kg">Kilogramos</option>
              <option value="lb">Libras</option>
              <option value="m3">Metros cúbicos</option>
              <option value="unidad">Unidad</option>
            </select>
          </div>
        </div>

        {/* Opción preferida */}
        <div className="flex flex-col">
          <label htmlFor="preferredOption" className="text-lg text-gray-600 mb-2">Opción preferida</label>
          <select
            id="preferredOption"
            value={preferredOption}
            onChange={(e) => setPreferredOption(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione opción</option>
            <option value="alta">Alta (Materiales de mejor calidad)</option>
            <option value="media">Media (Materiales de calidad aceptable)</option>
            <option value="baja">Baja (Materiales económicos)</option>
          </select>
        </div>

        {/* Botón de submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaterialRequestsForm;
