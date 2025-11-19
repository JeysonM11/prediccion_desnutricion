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


## 📚 Fuente de Datos

Los datos utilizados en este proyecto provienen del portal de datos abiertos del Gobierno de Colombia. Concretamente del conjunto de datos **"Desnutrición aguda en menores de 5 años"**.

**Enlace al dataset:**  
[Desnutrición aguda en menores de 5 años — datos.gov.co](https://www.datos.gov.co/dataset/Desnutrici-n-aguda-en-menores-de-5-a-os/wvr9-523z/about_data)

Por favor, revise la página oficial para información sobre licencias, alcance y términos de uso del dataset.



## 📖 Documentación Extendida

Para mayor información sobre el proyecto, consulte la documentación completa:

- **Documento técnico**: [Especificaciones Técnicas](https://docs.google.com/document/d/1aG64eoF2PMq4nvz-tDJ0X_WWVeZVAW2EKQF9KpbZtoQ/edit?tab=t.0)

- **Documento principal**: [Documentación del Proyecto](https://docs.google.com/document/d/1D6oN_ay5qZm_lqF20ykRn2DKvE_XIN1i/edit?rtpof=true&sd=true)



