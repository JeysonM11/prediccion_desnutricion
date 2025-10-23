"""
Endpoints para predicción de desnutrición
"""
from fastapi import APIRouter, HTTPException
from app.schemas.input_schema import PredictionInput, PredictionOutput
import joblib
import os
import numpy as np

router = APIRouter()

# Cargar modelo al iniciar
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model', 'model.pkl')
model = joblib.load(MODEL_PATH)

@router.post("/predict", response_model=PredictionOutput)
async def predict_malnutrition(data: PredictionInput):
    """
    Realiza una predicción de riesgo de desnutrición
    
    Flujo:
    1. Recibe datos del niño (edad, peso, talla, perímetro braquial)
    2. Calcula IMC y prepara features
    3. El modelo predice la categoría nutricional
    4. Clasifica según probabilidad y devuelve resultado con recomendaciones
    """
    try:
        # Calcular IMC si no está proporcionado
        if data.imc is None:
            data.imc = data.peso_kg / ((data.talla_cm / 100) ** 2)
        
        # Preparar features en el orden correcto
        # ['edad_meses', 'peso_kg', 'talla_cm', 'imc', 'per_braqu_cm']
        features = np.array([[
            float(data.edad_meses),
            float(data.peso_kg),
            float(data.talla_cm),
            float(data.imc),
            float(data.per_braqu_cm)
        ]])
        
        # Realizar predicción
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        
        # Mapear predicción a categoría y nivel
        # Las clases en orden alfabético: Desnutrición, Normal, Riesgo
        category_mapping = {
            'Desnutrición': (2, 'Desnutrición'),
            'Normal': (0, 'Normal'),
            'Riesgo': (1, 'Riesgo de Desnutrición')
        }
        
        riesgo_nivel, categoria_texto = category_mapping[prediction]
        
        # Obtener la probabilidad de la clase predicha
        # Encontrar el índice de la categoría predicha
        classes = model.classes_
        pred_index = list(classes).index(prediction)
        probability = float(probabilities[pred_index])
        
        return PredictionOutput(
            categoria=categoria_texto,
            probabilidad=probability,
            riesgo_nivel=riesgo_nivel,
            recomendaciones=get_recommendations(riesgo_nivel, probability, data)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en la predicción: {str(e)}")

@router.get("/stats")
async def get_statistics():
    """
    Obtiene estadísticas del modelo
    """
    return {
        "modelo": "RandomForestClassifier",
        "caracteristicas": ["edad_meses", "peso_kg", "talla_cm", "imc", "per_braqu_cm"],
        "categorias": ["Normal", "Riesgo de Desnutrición", "Desnutrición"],
        "precision": "98.95%",
        "total_datos_entrenamiento": 1902
    }

def get_recommendations(prediction: int, probability: float, data: PredictionInput) -> list:
    """
    Genera recomendaciones según la predicción y los datos del niño
    
    Args:
        prediction: Nivel de riesgo (0: Normal, 1: Riesgo, 2: Desnutrición)
        probability: Confianza de la predicción (0-1)
        data: Datos del paciente
    """
    # Calcular edad en años y meses para recomendaciones
    años = data.edad_meses // 12
    meses = data.edad_meses % 12
    edad_texto = f"{años} año{'s' if años != 1 else ''}" if años > 0 else ""
    if meses > 0:
        edad_texto += f" {meses} mes{'es' if meses != 1 else ''}" if edad_texto else f"{meses} mes{'es' if meses != 1 else ''}"
    
    # Análisis del perímetro braquial
    pb_info = ""
    if data.per_braqu_cm > 0:
        if data.per_braqu_cm < 11.5:
            pb_info = "🔴 Perímetro braquial muy bajo (< 11.5 cm) - Indica desnutrición aguda severa"
        elif data.per_braqu_cm < 12.5:
            pb_info = "� Perímetro braquial bajo (11.5-12.5 cm) - Indica riesgo nutricional"
        else:
            pb_info = "🟢 Perímetro braquial normal (> 12.5 cm)"
    
    recommendations = {
        0: [
            f"✅ Estado nutricional NORMAL para {edad_texto}",
            pb_info if pb_info else "📊 Mantener monitoreo regular del crecimiento",
            "🥗 Continuar con alimentación balanceada rica en nutrientes",
            "📅 Controles de crecimiento cada 3 meses",
            "💪 Promover actividad física apropiada para la edad",
            f"📈 IMC actual: {data.imc:.2f} - Dentro de rango saludable"
        ],
        1: [
            f"⚠️ RIESGO DE DESNUTRICIÓN detectado en {edad_texto}",
            pb_info if pb_info else f"📊 IMC: {data.imc:.2f} - Por debajo del rango óptimo",
            "👨‍⚕️ URGENTE: Consultar nutricionista pediátrico en 1-2 semanas",
            "🍎 Aumentar frecuencia de comidas a 5-6 veces/día",
            "🥛 Incluir alimentos ricos en proteínas y calorías",
            "📊 Monitoreo semanal de peso y talla",
            "💊 Evaluar necesidad de suplementos nutricionales",
            f"🎯 Meta: Aumentar {2-data.peso_kg*0.1:.1f} kg en próximo mes"
        ],
        2: [
            f"🚨 DESNUTRICIÓN CONFIRMADA en {edad_texto} - ATENCIÓN URGENTE",
            pb_info if pb_info else f"⚠️ IMC crítico: {data.imc:.2f}",
            "🏥 Acudir INMEDIATAMENTE a evaluación médica",
            "📋 Requiere exámenes de laboratorio completos",
            "🍽️ Plan de recuperación nutricional intensivo",
            "👥 Seguimiento médico SEMANAL obligatorio",
            "💉 Tratamiento de deficiencias nutricionales",
            "🏠 Evaluación socioeconómica y apoyo familiar",
            f"🎯 Objetivo crítico: Recuperación de {3-data.peso_kg*0.15:.1f} kg"
        ]
    }
    
    base_recommendations = recommendations.get(prediction, ["Consultar con un profesional de la salud"])
    
    # Agregar nota sobre confianza de la predicción
    if probability < 0.6:
        base_recommendations.append(
            f"ℹ️ Nota: Confianza de predicción moderada ({probability*100:.1f}%). "
            "Se recomienda evaluación médica adicional para confirmar diagnóstico."
        )
    
    return base_recommendations
