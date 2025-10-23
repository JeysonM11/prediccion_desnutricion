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
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">
        Datos del Paciente
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="edad_meses" className="block text-sm font-semibold text-gray-700">
            Edad (meses)
          </label>
          <input
            type="number"
            id="edad_meses"
            name="edad_meses"
            value={formData.edad_meses}
            onChange={handleChange}
            placeholder="0-60 meses"
            min="0"
            max="60"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          />
          {errors.edad_meses && (
            <span className="text-red-500 text-sm mt-1 block">{errors.edad_meses}</span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="peso_kg" className="block text-sm font-semibold text-gray-700">
            Peso (kg)
          </label>
          <input
            type="number"
            id="peso_kg"
            name="peso_kg"
            value={formData.peso_kg}
            onChange={handleChange}
            placeholder="Peso en kilogramos"
            step="0.1"
            min="0"
            max="30"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          />
          {errors.peso_kg && (
            <span className="text-red-500 text-sm mt-1 block">{errors.peso_kg}</span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="talla_cm" className="block text-sm font-semibold text-gray-700">
            Talla (cm)
          </label>
          <input
            type="number"
            id="talla_cm"
            name="talla_cm"
            value={formData.talla_cm}
            onChange={handleChange}
            placeholder="Talla en centímetros"
            step="0.1"
            min="0"
            max="120"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          />
          {errors.talla_cm && (
            <span className="text-red-500 text-sm mt-1 block">{errors.talla_cm}</span>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="per_braqu_cm" className="block text-sm font-semibold text-gray-700">
            Perímetro Braquial (cm)
            <span className="text-gray-500 text-xs ml-2">(opcional - ingresar 0 si no está disponible)</span>
          </label>
          <input
            type="number"
            id="per_braqu_cm"
            name="per_braqu_cm"
            value={formData.per_braqu_cm}
            onChange={handleChange}
            placeholder="Ej: 12.5 cm (0 si no disponible)"
            step="0.1"
            min="0"
            max="30"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">
            📊 Referencia: &lt;11.5 cm = Desnutrición severa | 11.5-12.5 cm = Riesgo | &gt;12.5 cm = Normal
          </p>
          {errors.per_braqu_cm && (
            <span className="text-red-500 text-sm mt-1 block">{errors.per_braqu_cm}</span>
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg mt-6"
          disabled={loading}
        >
          {loading ? 'Analizando...' : 'Evaluar Riesgo'}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
