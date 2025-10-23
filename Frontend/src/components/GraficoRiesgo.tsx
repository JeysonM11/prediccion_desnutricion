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

  // Datos para gráfico de pastel
  const pieData = {
    labels: ['Probabilidad', 'Incertidumbre'],
    datasets: [
      {
        data: [resultado.probabilidad * 100, (1 - resultado.probabilidad) * 100],
        backgroundColor: [
          resultado.riesgo_nivel === 0 ? '#4caf50' : 
          resultado.riesgo_nivel === 1 ? '#ff9800' : '#f44336',
          '#e0e0e0'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  // Datos para gráfico de barras (niveles de riesgo)
  const barData = {
    labels: ['Normal', 'Riesgo', 'Desnutrición'],
    datasets: [
      {
        label: 'Nivel de Riesgo',
        data: [
          resultado.riesgo_nivel === 0 ? 100 : 0,
          resultado.riesgo_nivel === 1 ? 100 : 0,
          resultado.riesgo_nivel === 2 ? 100 : 0
        ],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h3 className="text-3xl font-bold text-primary-600 mb-6 text-center">
        Visualización de Riesgo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Certeza de la Predicción
          </h4>
          <div className="h-80 flex items-center justify-center">
            <Pie data={pieData} options={options} />
          </div>
        </div>

        <div className="text-center">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Categoría Detectada
          </h4>
          <div className="h-80 flex items-center justify-center">
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoRiesgo;
