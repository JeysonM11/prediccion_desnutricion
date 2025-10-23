import React, { useState } from 'react';
import Formulario from '../components/Formulario';
import Resultado from '../components/Resultado';
import GraficoRiesgo from '../components/GraficoRiesgo';
import { realizarPrediccion, PredictionInput, PredictionOutput } from '../services/api';
import './Dashboard.css';

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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🏥 Panel de Evaluación Nutricional</h1>
        <p>Sistema de Predicción de Desnutrición Infantil</p>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="form-section">
            <Formulario onPredict={handlePredict} />
            
            {error && (
              <div className="error-message">
                <span className="error-icon">❌</span>
                <p>{error}</p>
              </div>
            )}

            {resultado && (
              <button onClick={handleReset} className="btn-reset">
                Nueva Evaluación
              </button>
            )}
          </div>

          <div className="results-section">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Analizando datos...</p>
              </div>
            ) : (
              <>
                <Resultado resultado={resultado} />
                <GraficoRiesgo resultado={resultado} />
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>
          💡 <strong>Recuerda:</strong> Esta es una herramienta de apoyo. 
          Los resultados deben ser validados por un profesional de la salud.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
