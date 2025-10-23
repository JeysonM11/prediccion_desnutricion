import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">
              <span className="brand-icon">🏥</span>
              <span className="brand-name">NutriPredict</span>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
