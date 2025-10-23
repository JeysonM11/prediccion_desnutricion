import axios, { AxiosInstance, AxiosError } from 'axios';

// Interfaces para los tipos de datos
export interface PredictionInput {
  edad_meses: number;
  peso_kg: number;
  talla_cm: number;
  imc?: number;
  per_braqu_cm: number;
}

export interface PredictionOutput {
  categoria: string;
  probabilidad: number;
  riesgo_nivel: number;
  recomendaciones: string[];
}

export interface ModelStats {
  modelo: string;
  caracteristicas: string[];
  categorias: string[];
}

export interface HealthStatus {
  status: string;
}

// URL base del backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Crear instancia de axios con configuración base
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error del servidor:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo sucedió al configurar la petición
      console.error('Error en la configuración de la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Realiza una predicción de desnutrición
 * @param {PredictionInput} data - Datos del paciente
 * @returns {Promise<PredictionOutput>} Resultado de la predicción
 */
export const realizarPrediccion = async (data: PredictionInput): Promise<PredictionOutput> => {
  try {
    const response = await api.post<PredictionOutput>('/predict', data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new Error(
      axiosError.response?.data?.detail || 
      'Error al realizar la predicción. Intente nuevamente.'
    );
  }
};

/**
 * Obtiene estadísticas del modelo
 * @returns {Promise<ModelStats>} Estadísticas del modelo
 */
export const obtenerEstadisticas = async (): Promise<ModelStats> => {
  try {
    const response = await api.get<ModelStats>('/stats');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener estadísticas');
  }
};

/**
 * Verifica el estado de salud del servidor
 * @returns {Promise<HealthStatus>} Estado del servidor
 */
export const verificarSalud = async (): Promise<HealthStatus> => {
  try {
    const response = await axios.get<HealthStatus>(`${API_BASE_URL.replace('/api', '')}/health`);
    return response.data;
  } catch (error) {
    throw new Error('El servidor no está disponible');
  }
};

export default api;
