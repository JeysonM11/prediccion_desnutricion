import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PredictionInput } from '../services/api';

interface FormularioProps {
  onPredict: (data: PredictionInput) => Promise<void>;
}

interface FormData {
  edad_meses: string;
  peso_kg: string;
  talla_cm: string;
  per_braqu_cm: string;
}

interface FormErrors {
  edad_meses?: string;
  peso_kg?: string;
  talla_cm?: string;
  per_braqu_cm?: string;
}

const Formulario: React.FC<FormularioProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState<FormData>({
    edad_meses: '',
    peso_kg: '',
    talla_cm: '',
    per_braqu_cm: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.edad_meses || parseFloat(formData.edad_meses) < 0 || parseFloat(formData.edad_meses) > 60) {
      newErrors.edad_meses = 'La edad debe estar entre 0 y 60 meses';
    }

    if (!formData.peso_kg || parseFloat(formData.peso_kg) <= 0 || parseFloat(formData.peso_kg) > 30) {
      newErrors.peso_kg = 'El peso debe estar entre 0 y 30 kg';
    }

    if (!formData.talla_cm || parseFloat(formData.talla_cm) <= 0 || parseFloat(formData.talla_cm) > 120) {
      newErrors.talla_cm = 'La talla debe estar entre 0 y 120 cm';
    }

    if (!formData.per_braqu_cm || parseFloat(formData.per_braqu_cm) < 0 || parseFloat(formData.per_braqu_cm) > 30) {
      newErrors.per_braqu_cm = 'El perímetro braquial debe estar entre 0 y 30 cm (0 si no está disponible)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    const data: PredictionInput = {
      edad_meses: parseInt(formData.edad_meses),
      peso_kg: parseFloat(formData.peso_kg),
      talla_cm: parseFloat(formData.talla_cm),
      per_braqu_cm: parseFloat(formData.per_braqu_cm)
    };

    try {
      await onPredict(data);
    } catch (error) {
      console.error('Error al realizar predicción:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Edad */}
        <div className="space-y-2">
          <label htmlFor="edad_meses" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Edad del paciente
          </label>
          <div className="relative">
            <input
              type="number"
              id="edad_meses"
              name="edad_meses"
              value={formData.edad_meses}
              onChange={handleChange}
              placeholder="Ejemplo: 24"
              min="0"
              max="60"
              className={`w-full px-4 py-3.5 pl-11 bg-gray-50 border-2 rounded-xl transition-all duration-200 ${
                errors.edad_meses 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              } focus:outline-none focus:bg-white`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium text-gray-500">meses</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Rango válido: 0-60 meses (0-5 años)
          </p>
          {errors.edad_meses && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.edad_meses}
            </div>
          )}
        </div>

        {/* Peso */}
        <div className="space-y-2">
          <label htmlFor="peso_kg" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Peso del paciente
          </label>
          <div className="relative">
            <input
              type="number"
              id="peso_kg"
              name="peso_kg"
              value={formData.peso_kg}
              onChange={handleChange}
              placeholder="Ejemplo: 10.5"
              step="0.1"
              min="0"
              max="30"
              className={`w-full px-4 py-3.5 pl-11 bg-gray-50 border-2 rounded-xl transition-all duration-200 ${
                errors.peso_kg 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100'
              } focus:outline-none focus:bg-white`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium text-gray-500">kg</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Rango válido: 0-30 kg
          </p>
          {errors.peso_kg && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.peso_kg}
            </div>
          )}
        </div>

        {/* Talla */}
        <div className="space-y-2">
          <label htmlFor="talla_cm" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Talla del paciente
          </label>
          <div className="relative">
            <input
              type="number"
              id="talla_cm"
              name="talla_cm"
              value={formData.talla_cm}
              onChange={handleChange}
              placeholder="Ejemplo: 85.5"
              step="0.1"
              min="0"
              max="120"
              className={`w-full px-4 py-3.5 pl-11 bg-gray-50 border-2 rounded-xl transition-all duration-200 ${
                errors.talla_cm 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100'
              } focus:outline-none focus:bg-white`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium text-gray-500">cm</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Rango válido: 0-120 cm
          </p>
          {errors.talla_cm && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.talla_cm}
            </div>
          )}
        </div>

        {/* Perímetro Braquial */}
        <div className="space-y-2">
          <label htmlFor="per_braqu_cm" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Perímetro Braquial
            <span className="ml-auto text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Opcional</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="per_braqu_cm"
              name="per_braqu_cm"
              value={formData.per_braqu_cm}
              onChange={handleChange}
              placeholder="Ejemplo: 12.5 (o 0 si no disponible)"
              step="0.1"
              min="0"
              max="30"
              className={`w-full px-4 py-3.5 pl-11 bg-gray-50 border-2 rounded-xl transition-all duration-200 ${
                errors.per_braqu_cm 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100'
              } focus:outline-none focus:bg-white`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium text-gray-500">cm</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-3 border border-orange-200">
            <p className="text-xs font-medium text-orange-800 mb-2 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Valores de referencia:
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white rounded px-2 py-1.5 border border-orange-200">
                <div className="font-semibold text-red-600">&lt; 11.5 cm</div>
                <div className="text-gray-600">Desnutrición</div>
              </div>
              <div className="bg-white rounded px-2 py-1.5 border border-orange-200">
                <div className="font-semibold text-yellow-600">11.5-12.5</div>
                <div className="text-gray-600">Riesgo</div>
              </div>
              <div className="bg-white rounded px-2 py-1.5 border border-orange-200">
                <div className="font-semibold text-green-600">&gt; 12.5 cm</div>
                <div className="text-gray-600">Normal</div>
              </div>
            </div>
          </div>
          {errors.per_braqu_cm && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {errors.per_braqu_cm}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8"
          disabled={loading}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analizando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Evaluar Estado Nutricional
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default Formulario;
