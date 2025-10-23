import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto text-white">
      <header className="text-center py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Sistema de Predicción de Desnutrición Infantil
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Herramienta de apoyo para la detección temprana de desnutrición en niños
        </p>
      </header>

      <section className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-xl">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold mb-3">Predicción Precisa</h3>
            <p className="text-white/90">
              Utiliza algoritmos de machine learning para predecir el riesgo 
              de desnutrición basándose en datos antropométricos y clínicos.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-xl">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">Análisis Detallado</h3>
            <p className="text-white/90">
              Obtén visualizaciones claras y recomendaciones específicas 
              para cada caso evaluado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 shadow-xl">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Resultados Instantáneos</h3>
            <p className="text-white/90">
              Recibe el diagnóstico y las recomendaciones en cuestión de segundos.
            </p>
          </div>
        </div>

        <div className="text-center py-8 my-8">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Ingresa los datos del paciente y obtén una evaluación inmediata
          </p>
          <Link 
            to="/dashboard" 
            className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Iniciar Evaluación
          </Link>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl mt-8">
          <h3 className="text-2xl font-bold text-primary-600 mb-4">¿Qué datos necesito?</h3>
          <ul className="space-y-3 text-lg">
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Edad del niño (en meses)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Peso (en kilogramos)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Talla (en centímetros)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span>Nivel de hemoglobina (en g/dL)</span>
            </li>
          </ul>
        </div>
      </section>

      <footer className="text-center py-8 mt-8 bg-white/10 backdrop-blur-sm rounded-2xl">
        <p className="text-lg">
          <strong>Nota:</strong> Esta herramienta es de apoyo diagnóstico. 
          Siempre consulte con un profesional de la salud para un diagnóstico definitivo.
        </p>
      </footer>
    </div>
  );
};

export default Home;
