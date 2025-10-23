import React from 'react';
import { PredictionOutput } from '../services/api';

interface ResultadoProps {
  resultado: PredictionOutput | null;
}

const Resultado: React.FC<ResultadoProps> = ({ resultado }) => {
  if (!resultado) {
    return null;
  }

  const getRiesgoConfig = (nivel: number) => {
    switch (nivel) {
      case 0:
        return {
          bgGradient: 'from-green-500 to-emerald-600',
          bgLight: 'from-green-50 to-emerald-50',
          border: 'border-green-500',
          text: 'text-green-700',
          icon: (
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          badge: 'Sin Riesgo',
          badgeBg: 'bg-green-100 text-green-700'
        };
      case 1:
        return {
          bgGradient: 'from-orange-500 to-amber-600',
          bgLight: 'from-orange-50 to-amber-50',
          border: 'border-orange-500',
          text: 'text-orange-700',
          icon: (
            <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          badge: 'Riesgo Moderado',
          badgeBg: 'bg-orange-100 text-orange-700'
        };
      case 2:
        return {
          bgGradient: 'from-red-500 to-rose-600',
          bgLight: 'from-red-50 to-rose-50',
          border: 'border-red-500',
          text: 'text-red-700',
          icon: (
            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          badge: 'Riesgo Alto',
          badgeBg: 'bg-red-100 text-red-700'
        };
      default:
        return {
          bgGradient: 'from-gray-500 to-slate-600',
          bgLight: 'from-gray-50 to-slate-50',
          border: 'border-gray-500',
          text: 'text-gray-700',
          icon: (
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          badge: 'Desconocido',
          badgeBg: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const config = getRiesgoConfig(resultado.riesgo_nivel);

  return (
    <div className="space-y-6">
      {/* Header with Icon Badge */}
      <div className={`bg-gradient-to-br ${config.bgLight} rounded-2xl p-6 border-2 ${config.border}`}>
        <div className="flex items-center gap-5">
          <div className={`bg-gradient-to-br ${config.bgGradient} p-4 rounded-2xl shadow-lg`}>
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-black text-gray-800">{resultado.categoria}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.badgeBg}`}>
                {config.badge}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Diagnóstico basado en análisis nutricional completo</p>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800">Confianza del Modelo</p>
            <p className="text-sm text-gray-500">Nivel de certeza en la predicción</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-gray-100 rounded-full h-10 overflow-hidden shadow-inner">
            <div 
              className={`h-full flex items-center justify-end pr-4 text-white font-bold text-lg transition-all duration-700 ease-out bg-gradient-to-r ${config.bgGradient} shadow-lg`}
              style={{ width: `${resultado.probabilidad * 100}%` }}
            >
              {(resultado.probabilidad * 100).toFixed(1)}%
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-lg">Recomendaciones Clínicas</h4>
            <p className="text-sm text-gray-500">Plan de acción sugerido</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {resultado.recomendaciones.map((rec, index) => (
            <div 
              key={index}
              className={`group p-4 bg-gradient-to-br ${config.bgLight} border-l-4 ${config.border} rounded-lg hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${config.bgGradient} flex items-center justify-center text-white text-xs font-bold`}>
                  {index + 1}
                </div>
                <p className={`${config.text} font-medium flex-1`}>{rec}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Note */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border-2 border-amber-300">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-bold text-amber-900 mb-1">Nota Importante</p>
            <p className="text-sm text-amber-800">
              Este resultado es una herramienta de apoyo diagnóstico. Siempre consulte con un profesional de la salud para una evaluación completa y plan de tratamiento personalizado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
