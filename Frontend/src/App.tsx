import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white/95 backdrop-blur-sm shadow-lg px-8 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-4xl">🏥</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                NutriPredict
              </span>
            </Link>
            <ul className="flex gap-8 list-none">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 font-medium hover:text-primary-500 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 font-medium hover:text-primary-500 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="p-8">
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
