# Sistema de Predicción de Desnutrición Infantil

Sistema completo de predicción de riesgo de desnutrición infantil usando Machine Learning.

## 📋 Estructura del Proyecto

### Backend (FastAPI + Python)
```
Backend/
├── app/
│   ├── main.py               # Punto de entrada FastAPI
│   ├── model/
│   │   ├── train_model.py    # Entrenamiento del modelo
│   │   └── model.pkl         # Modelo entrenado
│   ├── routes/
│   │   └── predict.py        # Endpoints de predicción
│   ├── schemas/
│   │   └── input_schema.py   # Validación de datos
│   ├── utils/
│   │   └── preprocessing.py  # Preprocesamiento
│   └── database/
│       └── db.py             # Conexión a BD
└── requirements.txt
```

### Frontend (React + TypeScript)
```
Frontend/
├── src/
│   ├── components/
│   │   ├── Formulario.tsx
│   │   ├── Resultado.tsx
│   │   └── GraficoRiesgo.tsx
│   ├── services/
│   │   └── api.ts            # Conexión con backend
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Dashboard.tsx
│   └── App.tsx
├── package.json
└── tsconfig.json
```

## 🚀 Instalación

### Backend
```bash
cd Backend
pip install -r requirements.txt
python -m app.model.train_model  # Entrenar el modelo
uvicorn app.main:app --reload    # Iniciar servidor
```

### Frontend
```bash
cd Frontend
npm install
npm start
```

## 📊 Uso

1. Inicia el backend en `http://localhost:8000`
2. Inicia el frontend en `http://localhost:3000`
3. Ingresa los datos del paciente:
   - Edad (meses)
   - Peso (kg)
   - Talla (cm)
   - Hemoglobina (g/dL)
4. Obtén la predicción con recomendaciones

## 🔧 Tecnologías

**Backend:**
- Python 3.10+
- FastAPI
- scikit-learn, pandas, numpy
- SQLAlchemy
- Pydantic
- SQLite

**Frontend:**
- React 18+
- TypeScript
- TailwindCSS
- Axios
- Chart.js
- React Router

## 📝 Notas

Esta es una herramienta de apoyo diagnóstico. Siempre consulte con un profesional de la salud.
