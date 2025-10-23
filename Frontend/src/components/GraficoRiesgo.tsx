import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { PredictionOutput } from '../services/api';

// Registrar componentes de Chart.js
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GraficoRiesgoProps {
  resultado: PredictionOutput | null;
}

const GraficoRiesgo: React.FC<GraficoRiesgoProps> = ({ resultado }) => {
  if (!resultado) {
    return null;
  }

  // Configuración de colores moderna con gradientes
  const getColorConfig = (nivel: number) => {
    switch (nivel) {
      case 0: // Sin riesgo
        return {
          primary: '#10b981',
          secondary: '#059669',
          light: '#d1fae5',
          gradient: ['#10b981', '#059669']
        };
      case 1: // Riesgo moderado
        return {
          primary: '#f59e0b',
          secondary: '#d97706',
          light: '#fef3c7',
          gradient: ['#f59e0b', '#d97706']
        };
      case 2: // Alto riesgo
        return {
          primary: '#ef4444',
          secondary: '#dc2626',
          light: '#fee2e2',
          gradient: ['#ef4444', '#dc2626']
        };
      default:
        return {
          primary: '#6b7280',
          secondary: '#4b5563',
          light: '#e5e7eb',
          gradient: ['#6b7280', '#4b5563']
        };
    }
  };

  const colors = getColorConfig(resultado.riesgo_nivel);

  // Datos para gráfico de pastel con colores modernos
  const pieData = {
    labels: ['Confianza del Modelo', 'Incertidumbre'],
    datasets: [
      {
        data: [resultado.probabilidad * 100, (1 - resultado.probabilidad) * 100],
        backgroundColor: [colors.primary, '#e5e7eb'],
        borderWidth: 0,
        hoverOffset: 10,
        hoverBackgroundColor: [colors.secondary, '#d1d5db']
      }
    ]
  };

  // Datos para gráfico de barras con diseño moderno
  const barData = {
    labels: ['Sin Riesgo', 'Riesgo Moderado', 'Alto Riesgo'],
    datasets: [
      {
        label: 'Clasificación',
        data: [
          resultado.riesgo_nivel === 0 ? 100 : 20,
          resultado.riesgo_nivel === 1 ? 100 : 20,
          resultado.riesgo_nivel === 2 ? 100 : 20
        ],
        backgroundColor: [
          resultado.riesgo_nivel === 0 ? '#10b981' : '#d1fae5',
          resultado.riesgo_nivel === 1 ? '#f59e0b' : '#fef3c7',
          resultado.riesgo_nivel === 2 ? '#ef4444' : '#fee2e2'
        ],
        borderRadius: 12,
        borderSkipped: false,
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 13,
            weight: 600
          },
          usePointStyle: true,
          pointStyle: 'circle' as const
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        borderColor: colors.primary,
        borderWidth: 2,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed.toFixed(1)}%`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        borderColor: colors.primary,
        borderWidth: 2,
        callbacks: {
          label: function(context: any) {
            if (context.parsed.y === 100) {
              return `Clasificación: ${context.label}`;
            }
            return 'Otras categorías';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f3f4f6',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 600
          },
          color: '#6b7280',
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            weight: 600
          },
          color: '#374151'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-300">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">Análisis Visual</h3>
            <p className="text-gray-600 text-sm">Representación gráfica del diagnóstico</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className={`bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}] p-2 rounded-lg`}
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Confianza del Modelo</h4>
              <p className="text-xs text-gray-500">Nivel de certeza en la predicción</p>
            </div>
          </div>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg p-4">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className={`bg-gradient-to-br from-[${colors.primary}] to-[${colors.secondary}] p-2 rounded-lg`}
                 style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Categoría Detectada</h4>
              <p className="text-xs text-gray-500">Clasificación nutricional</p>
            </div>
          </div>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg p-4">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Legend Info */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-5 border-2 border-gray-200">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="font-bold text-gray-800 mb-2">Interpretación de Gráficos</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Gráfico circular:</strong> Muestra la confianza del modelo IA en su predicción</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Gráfico de barras:</strong> Indica la categoría nutricional diagnosticada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoRiesgo;
