import React, { useState } from 'react';
import Formulario from '../components/Formulario';
import Resultado from '../components/Resultado';
import GraficoRiesgo from '../components/GraficoRiesgo';
import { realizarPrediccion, PredictionInput, PredictionOutput } from '../services/api';

const Dashboard: React.FC = () => {
  const [resultado, setResultado] = useState<PredictionOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (data: PredictionInput): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const prediccion = await realizarPrediccion(data);
      setResultado(prediccion);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error al realizar predicción:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => {
    setResultado(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="text-center text-white py-8">
        <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">
          🏥 Panel de Evaluación Nutricional
        </h1>
        <p className="text-xl opacity-90">Sistema de Predicción de Desnutrición Infantil</p>
      </header>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Formulario onPredict={handlePredict} />
            
            {error && (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">❌</span>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {resultado && (
              <button 
                onClick={handleReset} 
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Nueva Evaluación
              </button>
            )}
          </div>

          <div className="min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-primary-600 font-bold text-lg">Analizando datos...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <Resultado resultado={resultado} />
                <GraficoRiesgo resultado={resultado} />
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center text-white py-6 bg-white/10 backdrop-blur-sm rounded-2xl">
        <p className="text-lg">
          💡 <strong>Recuerda:</strong> Esta es una herramienta de apoyo. 
          Los resultados deben ser validados por un profesional de la salud.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
