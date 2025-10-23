import React from 'react';
import { PredictionOutput } from '../services/api';
import './Resultado.css';

interface ResultadoProps {
  resultado: PredictionOutput | null;
}

const Resultado: React.FC<ResultadoProps> = ({ resultado }) => {
  if (!resultado) {
    return null;
  }

  const getRiesgoClass = (nivel: number): string => {
    switch (nivel) {
      case 0:
        return 'riesgo-bajo';
      case 1:
        return 'riesgo-medio';
      case 2:
        return 'riesgo-alto';
      default:
        return '';
    }
  };

  const getRiesgoIcon = (nivel: number): string => {
    switch (nivel) {
      case 0:
        return '✅';
      case 1:
        return '⚠️';
      case 2:
        return '🚨';
      default:
        return '❓';
    }
  };

  return (
    <div className="resultado-container">
      <h2>Resultado del Análisis</h2>
      
      <div className={`resultado-card ${getRiesgoClass(resultado.riesgo_nivel)}`}>
        <div className="resultado-header">
          <span className="resultado-icon">{getRiesgoIcon(resultado.riesgo_nivel)}</span>
          <h3>{resultado.categoria}</h3>
        </div>

        <div className="resultado-probabilidad">
          <p>Probabilidad de certeza:</p>
          <div className="probabilidad-bar">
            <div 
              className="probabilidad-fill"
              style={{ width: `${resultado.probabilidad * 100}%` }}
            >
              {(resultado.probabilidad * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="resultado-recomendaciones">
          <h4>Recomendaciones:</h4>
          <ul>
            {resultado.recomendaciones.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
