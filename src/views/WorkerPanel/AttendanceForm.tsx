import { useState, useEffect } from 'react';

// Interface para los datos de asistencia que se enviarán al submit
interface AttendanceData {
  entryTime: string;       // Hora de entrada en formato "HH:MM"
  exitTime: string;        // Hora de salida en formato "HH:MM"
  normalHours: number;     // Jornada laboral configurada (ej: 8 horas)
  totalHours: number;      // Horas totales trabajadas
  normalWorked: number;    // Horas trabajadas dentro de la jornada
  extraHours: number;      // Horas extras trabajadas
}

// Interface para el estado del formulario
interface FormData {
  date: string;           // Fecha en formato "YYYY-MM-DD"
  entryTime: string;      // Hora de entrada
  exitTime: string;       // Hora de salida
  normalWorkDay: number;  // Jornada laboral normal en horas
  location: string;       // Ubicación en formato "lat, long"
}

const AttendanceForm = ({ onSubmit }: { onSubmit: (data: AttendanceData) => void }) => {
  // Estado del formulario con valores iniciales
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    entryTime: '',                                // Hora de entrada vacía inicialmente
    exitTime: '',                                 // Hora de salida vacía inicialmente
    normalWorkDay: 8,                             // Jornada de 8 horas por defecto
    location: '4.6097, -74.0817'                  // Ubicación por defecto (Bogotá)
  });

  // Estado para almacenar los cálculos de horas
  const [calculation, setCalculation] = useState<{
    totalHours: number;    // Horas totales trabajadas
    normalHours: number;   // Horas dentro de la jornada
    extraHours: number;    // Horas extras
    nightHours?: number;   // Horas nocturnas (opcional)
  } | null>(null);

  // ==============================================
  // FUNCIONES DE CÁLCULO Y CONVERSIÓN
  // ==============================================

  /**
   * Convierte un string de tiempo "HH:MM" a minutos totales
   * @param time - String en formato "HH:MM"
   * @returns Número total de minutos desde las 00:00
   */
  const convertTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  /**
   * Calcula las horas trabajadas con soporte para turnos nocturnos
   * @returns Objeto con {totalHours, normalHours, extraHours, nightHours} o null si hay error
   */
  const calculateWorkHours = () => {
    // Validación: ambos campos deben tener valor
    if (!formData.entryTime || !formData.exitTime) return null;

    // Convertir horas a minutos para mayor precisión
    const entryMins = convertTimeToMinutes(formData.entryTime);
    const exitMins = convertTimeToMinutes(formData.exitTime);
    
    // Manejo de turnos que pasan la medianoche
    const totalMinutes = exitMins >= entryMins 
      ? exitMins - entryMins               // Turno normal (mismo día)
      : (1440 - entryMins) + exitMins;     // Turno nocturno (cruza medianoche)
    
    // Validación de rango horario (1 minuto a 24 horas)
    if (totalMinutes <= 0 || totalMinutes > 1440) {
      alert('El rango de horas no es válido');
      return null;
    }

    // ==============================================
    // CÁLCULO DE HORAS NORMALES Y EXTRAS
    // ==============================================
    
    const normalWorkMinutes = formData.normalWorkDay * 60; // Jornada a minutos
    
    // Horas normales trabajadas (no más que la jornada establecida)
    const normalMinutes = Math.min(totalMinutes, normalWorkMinutes);
    
    // Horas extras son cualquier tiempo trabajado más allá de la jornada
    const extraMinutes = Math.max(0, totalMinutes - normalWorkMinutes);
    
    // ==============================================
    // CÁLCULO DE HORAS NOCTURNAS (OPCIONAL)
    // ==============================================
    
    const nightStart = 22 * 60; // 10:00 pm en minutos
    const nightEnd = 6 * 60;    // 6:00 am en minutos
    let nightMinutes = 0;

    if (entryMins <= exitMins) {
      // Turno diurno normal (no cruza medianoche)
      nightMinutes = Math.max(0, 
        Math.min(exitMins, nightEnd) - Math.max(entryMins, nightStart)
      );
    } else {
      // Turno nocturno (cruza medianoche)
      nightMinutes = Math.max(0, nightEnd - entryMins) + 
                    Math.max(0, exitMins - nightStart);
    }

    // ==============================================
    // CONVERSIÓN FINAL A HORAS DECIMALES PRECISAS
    // ==============================================
    
    /**
     * Función para convertir minutos a horas con decimales exactos
     * @param minutes - Minutos a convertir
     * @returns Horas en formato decimal (ej: 90 minutos → 1.5 horas)
     */
    const minutesToExactHours = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return hours + (remainingMinutes / 60);
    };

    // Resultado final con todos los cálculos
    const result = {
      totalHours: parseFloat(minutesToExactHours(totalMinutes).toFixed(2)),
      normalHours: parseFloat(minutesToExactHours(normalMinutes).toFixed(2)),
      extraHours: parseFloat(minutesToExactHours(extraMinutes).toFixed(2)),
      nightHours: parseFloat(minutesToExactHours(nightMinutes).toFixed(2))
    };
    
    setCalculation(result);
    return result;
  };

  // ==============================================
  // MANEJADORES DE EVENTOS
  // ==============================================

  // Efecto para cálculo automático cuando cambian los datos relevantes
  useEffect(() => {
    if (formData.entryTime && formData.exitTime) {
      calculateWorkHours();
    }
  }, [formData.entryTime, formData.exitTime, formData.normalWorkDay]);

  /**
   * Maneja cambios en los campos de entrada
   * @param e - Evento de cambio del input
   */
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja el envío del formulario (marcar entrada o salida)
   * @param type - Tipo de marcación ('entry' o 'exit')
   */
  const handleSubmit = (type: 'entry' | 'exit') => {
    // Validación: para marcar salida debe haber una entrada registrada
    if (type === 'exit' && !formData.entryTime) {
      alert('Debe registrar la hora de entrada primero');
      return;
    }

    const result = calculateWorkHours();
    if (!result) {
      alert('Error en el cálculo de horas. Verifique los datos ingresados.');
      return;
    }

    // Enviar datos al componente padre
    onSubmit({
      entryTime: formData.entryTime,
      exitTime: formData.exitTime,
      normalHours: formData.normalWorkDay,    // Jornada configurada
      totalHours: result.totalHours,          // Horas totales
      normalWorked: result.normalHours,       // Horas dentro de jornada
      extraHours: result.extraHours           // Horas extras
    });
  };

  // ==============================================
  // RENDERIZADO DEL COMPONENTE
  // ==============================================
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Marcar Asistencia</h2>

      {/* Sección de información del trabajador */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Trabajador</label>
        <input 
          type="text" 
          className="w-full mt-1 p-2 border rounded-lg bg-gray-100" 
          disabled 
          value="Juan Pérez" 
        />
      </div>

      {/* Sección de zona asignada */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Zona Asignada</label>
        <input 
          type="text" 
          className="w-full mt-1 p-2 border rounded-lg bg-gray-100" 
          disabled 
          value="Zona Norte - Calle 12, Bogotá" 
        />
      </div>

      {/* Selector de fecha */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input 
          type="date" 
          className="w-full mt-1 p-2 border rounded-lg" 
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
      </div>

      {/* Configuración de jornada laboral normal */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Jornada Laboral Normal (horas/día)
        </label>
        <input
          type="number"
          min="1"
          max="12"
          className="w-full mt-1 p-2 border rounded-lg"
          value={formData.normalWorkDay}
          onChange={(e) => 
            setFormData({
              ...formData, 
              normalWorkDay: Math.max(1, Math.min(12, Number(e.target.value)))
            })
          }
        />
      </div>

      {/* Campos para hora de entrada y salida */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Entrada</label>
          <input 
            type="time" 
            className="w-full mt-1 p-2 border rounded-lg"
            name="entryTime"
            value={formData.entryTime}
            onChange={handleTimeChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Salida</label>
          <input 
            type="time" 
            className="w-full mt-1 p-2 border rounded-lg"
            name="exitTime"
            value={formData.exitTime}
            onChange={handleTimeChange}
          />
        </div>
      </div>

      {/* Resumen de horas calculadas */}
      {calculation && (
        <div className="mb-4 bg-blue-50 p-3 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Resumen de Horas</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2 rounded">
              <p className="text-xs text-gray-500">Total</p>
              <p className="font-bold">{calculation.totalHours}h</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="text-xs text-gray-500">Normales</p>
              <p className="font-bold">{calculation.normalHours}h</p>
            </div>
            <div className="bg-white p-2 rounded">
              <p className="text-xs text-gray-500">Extras</p>
              <p className="font-bold text-yellow-600">{calculation.extraHours}h</p>
            </div>
          </div>
          {calculation.nightHours && calculation.nightHours > 0 && (
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">Horas nocturnas</p>
              <p className="font-bold text-purple-600">{calculation.nightHours}h</p>
            </div>
          )}
        </div>
      )}

      {/* Sección de ubicación */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ubicación Actual</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 p-2 border rounded-lg bg-gray-100" 
            disabled 
            value={formData.location} 
          />
          <button 
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg transition-colors"
            onClick={() => setFormData({...formData, location: "4.6097, -74.0817"})}
          >
            Obtener
          </button>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        <button 
          type="button"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => {
            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            setFormData({...formData, entryTime: timeString});
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Marcar Entrada
        </button>
        <button 
          type="button"
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => {
            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            setFormData({...formData, exitTime: timeString});
            handleSubmit('exit');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 100-2H9V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Marcar Salida
        </button>
      </div>
    </div>
  );
};

export default AttendanceForm;