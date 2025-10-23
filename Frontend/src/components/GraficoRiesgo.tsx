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
import './GraficoRiesgo.css';

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
    <div className="grafico-container">
      <h3>Visualización de Riesgo</h3>
      
      <div className="graficos-grid">
        <div className="grafico-item">
          <h4>Certeza de la Predicción</h4>
          <div className="chart-wrapper">
            <Pie data={pieData} options={options} />
          </div>
        </div>

        <div className="grafico-item">
          <h4>Categoría Detectada</h4>
          <div className="chart-wrapper">
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoRiesgo;
