import React from 'react';
import { PredictionOutput } from '../services/api';

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
        return 'bg-green-50 border-green-500';
      case 1:
        return 'bg-orange-50 border-orange-500';
      case 2:
        return 'bg-red-50 border-red-500';
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

  const getProgressBarColor = (nivel: number): string => {
    switch (nivel) {
      case 0:
        return 'bg-gradient-to-r from-green-400 to-green-600';
      case 1:
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
      case 2:
        return 'bg-gradient-to-r from-red-400 to-red-600';
      default:
        return 'bg-gradient-to-r from-primary-500 to-secondary-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
      <h2 className="text-3xl font-bold text-primary-600 mb-6 text-center">
        Resultado del Análisis
      </h2>
      
      <div className={`p-6 rounded-xl border-4 ${getRiesgoClass(resultado.riesgo_nivel)}`}>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-6xl">{getRiesgoIcon(resultado.riesgo_nivel)}</span>
          <h3 className="text-3xl font-bold text-gray-800">{resultado.categoria}</h3>
        </div>

        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">Probabilidad de certeza:</p>
          <div className="bg-gray-200 rounded-full h-8 overflow-hidden">
            <div 
              className={`h-full flex items-center justify-center text-white font-bold transition-all duration-500 ${getProgressBarColor(resultado.riesgo_nivel)}`}
              style={{ width: `${resultado.probabilidad * 100}%` }}
            >
              {(resultado.probabilidad * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-primary-600 mb-4">Recomendaciones:</h4>
          <ul className="space-y-2">
            {resultado.recomendaciones.map((rec, index) => (
              <li 
                key={index}
                className="p-3 bg-primary-50 border-l-4 border-primary-500 rounded text-gray-700"
              >
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
