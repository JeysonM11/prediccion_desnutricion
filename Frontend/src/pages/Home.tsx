import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Sistema de Predicción de Desnutrición Infantil</h1>
        <p className="subtitle">
          Herramienta de apoyo para la detección temprana de desnutrición en niños
        </p>
      </header>

      <section className="home-content">
        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">🏥</div>
            <h3>Predicción Precisa</h3>
            <p>
              Utiliza algoritmos de machine learning para predecir el riesgo 
              de desnutrición basándose en datos antropométricos y clínicos.
            </p>
          </div>

          <div className="info-card">
            <div className="card-icon">📊</div>
            <h3>Análisis Detallado</h3>
            <p>
              Obtén visualizaciones claras y recomendaciones específicas 
              para cada caso evaluado.
            </p>
          </div>

          <div className="info-card">
            <div className="card-icon">⚡</div>
            <h3>Resultados Instantáneos</h3>
            <p>
              Recibe el diagnóstico y las recomendaciones en cuestión de segundos.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h2>¿Listo para comenzar?</h2>
          <p>Ingresa los datos del paciente y obtén una evaluación inmediata</p>
          <Link to="/dashboard" className="btn-cta">
            Iniciar Evaluación
          </Link>
        </div>

        <div className="info-section">
          <h3>¿Qué datos necesito?</h3>
          <ul className="requirements-list">
            <li>✓ Edad del niño (en meses)</li>
            <li>✓ Peso (en kilogramos)</li>
            <li>✓ Talla (en centímetros)</li>
            <li>✓ Nivel de hemoglobina (en g/dL)</li>
          </ul>
        </div>
      </section>

      <footer className="home-footer">
        <p>
          <strong>Nota:</strong> Esta herramienta es de apoyo diagnóstico. 
          Siempre consulte con un profesional de la salud para un diagnóstico definitivo.
        </p>
      </footer>
    </div>
  );
};

export default Home;
