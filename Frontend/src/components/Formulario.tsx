import React, { useState, ChangeEvent, FormEvent } from 'react';
import { PredictionInput } from '../services/api';
import './Formulario.css';

interface FormularioProps {
  onPredict: (data: PredictionInput) => Promise<void>;
}

interface FormData {
  edad_meses: string;
  peso_kg: string;
  talla_cm: string;
  hemoglobina: string;
}

interface FormErrors {
  edad_meses?: string;
  peso_kg?: string;
  talla_cm?: string;
  hemoglobina?: string;
}

const Formulario: React.FC<FormularioProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState<FormData>({
    edad_meses: '',
    peso_kg: '',
    talla_cm: '',
    hemoglobina: ''
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

    if (!formData.hemoglobina || parseFloat(formData.hemoglobina) <= 0 || parseFloat(formData.hemoglobina) > 20) {
      newErrors.hemoglobina = 'La hemoglobina debe estar entre 0 y 20 g/dL';
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
      hemoglobina: parseFloat(formData.hemoglobina)
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
    <div className="formulario-container">
      <h2>Datos del Paciente</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label htmlFor="edad_meses">Edad (meses)</label>
          <input
            type="number"
            id="edad_meses"
            name="edad_meses"
            value={formData.edad_meses}
            onChange={handleChange}
            placeholder="0-60 meses"
            min="0"
            max="60"
          />
          {errors.edad_meses && <span className="error">{errors.edad_meses}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="peso_kg">Peso (kg)</label>
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
          />
          {errors.peso_kg && <span className="error">{errors.peso_kg}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="talla_cm">Talla (cm)</label>
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
          />
          {errors.talla_cm && <span className="error">{errors.talla_cm}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hemoglobina">Hemoglobina (g/dL)</label>
          <input
            type="number"
            id="hemoglobina"
            name="hemoglobina"
            value={formData.hemoglobina}
            onChange={handleChange}
            placeholder="Nivel de hemoglobina"
            step="0.1"
            min="0"
            max="20"
          />
          {errors.hemoglobina && <span className="error">{errors.hemoglobina}</span>}
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Analizando...' : 'Realizar Predicción'}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
