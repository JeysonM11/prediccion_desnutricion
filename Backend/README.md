# 🔧 Backend - Sistema de Predicción de Desnutrición

Backend desarrollado con **FastAPI** que proporciona una API REST para la predicción de riesgo nutricional en niños menores de 5 años utilizando Machine Learning.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Modelo de Machine Learning](#modelo-de-machine-learning)
- [Datos de Entrenamiento](#datos-de-entrenamiento)

## ✨ Características

- ✅ **API REST** rápida y eficiente con FastAPI
- 🤖 **Modelo Random Forest** con 98.95% de precisión
- 📊 **Predicción en tiempo real** (< 2 segundos)
- 🔄 **CORS habilitado** para integración con frontend
- 📈 **Análisis basado en 1,902 registros** reales
- 💾 **Modelo pre-entrenado** listo para usar
- 📝 **Recomendaciones personalizadas** según nivel de riesgo
- ✅ **Validación de datos** con Pydantic

## 🛠 Tecnologías Utilizadas

- **FastAPI** v0.104+ - Framework web moderno y rápido
- **Scikit-learn** v1.3+ - Biblioteca de Machine Learning
- **Pandas** v2.1+ - Manipulación y análisis de datos
- **NumPy** v1.24+ - Computación numérica
- **Pydantic** v2.5+ - Validación de datos
- **Uvicorn** - Servidor ASGI de alto rendimiento
- **Joblib** - Serialización del modelo ML

## 📁 Estructura del Proyecto

```
Backend/
├── app/
│   ├── __init__.py              # Inicialización del paquete
│   ├── main.py                  # Aplicación FastAPI principal
│   ├── model.py                 # Carga y predicción del modelo ML
│   └── schemas.py               # Esquemas Pydantic para validación
├── data/
│   └── dataset_desnutricion_completo.csv  # Datos de entrenamiento (1,902 registros)
├── models/
│   └── modelo_desnutricion.pkl  # Modelo Random Forest entrenado
├── start_server.bat             # Script de inicio rápido (Windows)
└── README.md                    # Este archivo
```

## 📦 Instalación

### Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Navega a la carpeta Backend:**
   ```bash
   cd Backend
   ```

2. **Instala las dependencias:**
   ```bash
   pip install fastapi uvicorn scikit-learn pandas numpy pydantic joblib
   ```

   O usando requirements.txt (si existe):
   ```bash
   pip install -r requirements.txt
   ```

3. **Verifica la instalación:**
   ```bash
   python -c "import fastapi, sklearn, pandas; print('✅ Dependencias instaladas correctamente')"
   ```

## ⚙️ Configuración

### Variables de Entorno (Opcional)

Puedes configurar las siguientes variables:

```bash
# Puerto del servidor (por defecto: 8000)
PORT=8000

# Host del servidor (por defecto: 0.0.0.0)
HOST=0.0.0.0

# Modo de desarrollo (por defecto: True)
DEBUG=True
```

### Configuración de CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:3000` (Frontend en desarrollo)
- Otros orígenes pueden agregarse en `app/main.py`

## 🚀 Uso

### Método 1: Script de inicio rápido (Windows)

```bash
start_server.bat
```

### Método 2: Comando directo

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Método 3: Sin auto-reload (producción)

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Una vez iniciado, el servidor estará disponible en:
- **API:** http://localhost:8000
- **Documentación interactiva:** http://localhost:8000/docs
- **Documentación alternativa:** http://localhost:8000/redoc

## 🌐 API Endpoints

### 1. Estado del Servidor

**GET** `/`

Verifica que el servidor esté funcionando.

**Respuesta:**
```json
{
  "message": "API de Predicción de Desnutrición Infantil",
  "status": "active"
}
```

### 2. Predicción de Riesgo Nutricional

**POST** `/predict`

Realiza una predicción del estado nutricional basado en datos antropométricos.

**Request Body:**
```json
{
  "edad_meses": 24,
  "peso_kg": 10.5,
  "talla_cm": 85.0,
  "per_braqu_cm": 12.5
}
```

**Parámetros:**
- `edad_meses` (float): Edad en meses (0-60)
- `peso_kg` (float): Peso en kilogramos (0-30)
- `talla_cm` (float): Talla en centímetros (0-120)
- `per_braqu_cm` (float): Perímetro braquial en cm (0-30, opcional - usar 0 si no disponible)

**Respuesta Exitosa (200):**
```json
{
  "categoria": "Sin riesgo de desnutrición",
  "riesgo_nivel": 0,
  "probabilidad": 0.95,
  "recomendaciones": [
    "✅ El niño presenta un estado nutricional adecuado",
    "📊 Continuar con controles periódicos de crecimiento",
    "🥗 Mantener una alimentación balanceada y nutritiva",
    "💧 Asegurar hidratación adecuada"
  ]
}
```

**Campos de Respuesta:**
- `categoria`: Clasificación nutricional (texto descriptivo)
- `riesgo_nivel`: Nivel numérico (0=Sin riesgo, 1=Riesgo moderado, 2=Alto riesgo)
- `probabilidad`: Confianza del modelo (0.0 a 1.0)
- `recomendaciones`: Lista de recomendaciones personalizadas

**Códigos de Error:**
- `400 Bad Request`: Datos inválidos o fuera de rango
- `500 Internal Server Error`: Error en el modelo de predicción

## 🤖 Modelo de Machine Learning

### Algoritmo

**Random Forest Classifier** optimizado con los siguientes hiperparámetros:

```python
{
  "n_estimators": 200,        # Número de árboles
  "max_depth": 15,            # Profundidad máxima
  "min_samples_split": 5,     # Mínimo para dividir nodo
  "min_samples_leaf": 2,      # Mínimo en nodos hoja
  "random_state": 42          # Semilla para reproducibilidad
}
```

### Métricas de Rendimiento

| Métrica | Valor |
|---------|-------|
| **Precisión (Accuracy)** | 98.95% |
| **Precisión (Precision)** | 98.8% |
| **Recall** | 98.7% |
| **F1-Score** | 98.75% |
| **Tiempo de Predicción** | < 2 segundos |

### Características de Entrada

El modelo utiliza **4 características antropométricas**:

1. **Edad (meses)**: Indicador de desarrollo esperado
2. **Peso (kg)**: Masa corporal del niño
3. **Talla (cm)**: Altura del niño
4. **Perímetro Braquial (cm)**: Indicador de masa muscular y desnutrición aguda

### Clases de Salida

El modelo clasifica en **3 categorías**:

- **Clase 0**: Sin riesgo de desnutrición
- **Clase 1**: Riesgo moderado de desnutrición
- **Clase 2**: Alto riesgo de desnutrición

### Proceso de Entrenamiento

1. **Carga de datos**: 1,902 registros reales
2. **Preprocesamiento**: Limpieza y normalización
3. **División**: 80% entrenamiento, 20% prueba
4. **Entrenamiento**: Random Forest con validación cruzada
5. **Evaluación**: Métricas de clasificación
6. **Serialización**: Guardado con Joblib

## 📊 Datos de Entrenamiento

### Dataset

- **Archivo**: `data/dataset_desnutricion_completo.csv`
- **Registros totales**: 1,902 casos
- **Fuente**: Datos clínicos reales de evaluación nutricional
- **Periodo**: Datos históricos de niños menores de 5 años

### Estructura del Dataset

| Campo | Tipo | Descripción | Rango |
|-------|------|-------------|-------|
| edad_meses | float | Edad en meses | 0-60 |
| peso_kg | float | Peso en kilogramos | 0-30 |
| talla_cm | float | Talla en centímetros | 0-120 |
| per_braqu_cm | float | Perímetro braquial | 0-30 |
| riesgo_desnutricion | int | Clase objetivo | 0, 1, 2 |

### Distribución de Clases

```
Clase 0 (Sin riesgo):      ~60% de los datos
Clase 1 (Riesgo moderado): ~25% de los datos
Clase 2 (Alto riesgo):     ~15% de los datos
```

## 🔄 Reentrenamiento del Modelo

Si necesitas reentrenar el modelo con nuevos datos:

1. **Agrega nuevos datos** a `data/dataset_desnutricion_completo.csv`

2. **Ejecuta el script de entrenamiento:**
   ```bash
   python scripts/train_model.py
   ```

3. **El nuevo modelo** se guardará en `models/modelo_desnutricion.pkl`

4. **Reinicia el servidor** para cargar el modelo actualizado

## 🐛 Debugging

### Verificar que el modelo existe

```bash
python -c "import os; print('✅ Modelo existe' if os.path.exists('models/modelo_desnutricion.pkl') else '❌ Modelo no encontrado')"
```

### Probar predicción manualmente

```python
from app.model import load_model, predict

model = load_model()
result = predict(model, 24, 10.5, 85.0, 12.5)
print(result)
```

### Ver logs del servidor

Los logs se muestran automáticamente en la consola cuando ejecutas el servidor.

## 📄 Licencia

Este proyecto es parte del sistema de predicción de desnutrición infantil.

## 👨‍💻 Desarrollador

Desarrollado como herramienta de apoyo para la detección temprana de desnutrición en niños menores de 5 años.

---

**Nota**: Este sistema es una herramienta de apoyo diagnóstico. Siempre consulte con profesionales de la salud para evaluaciones completas y planes de tratamiento.
