"""
Endpoints para predicción de desnutrición
"""
from fastapi import APIRouter, HTTPException
from app.schemas.input_schema import PredictionInput, PredictionOutput
from app.model.train_model import load_model
from app.utils.preprocessing import preprocess_input
import numpy as np

router = APIRouter()

# Cargar modelo al iniciar
model = load_model()

@router.post("/predict", response_model=PredictionOutput)
async def predict_malnutrition(data: PredictionInput):
    """
    Realiza una predicción de riesgo de desnutrición
    """
    try:
        # Preprocesar datos
        features = preprocess_input(data)
        
        # Realizar predicción
        prediction = model.predict([features])[0]
        probability = model.predict_proba([features])[0]
        
        # Mapear predicción a categoría
        categories = {
            0: "Normal",
            1: "Riesgo de Desnutrición",
            2: "Desnutrición"
        }
        
        return PredictionOutput(
            categoria=categories.get(prediction, "Desconocido"),
            probabilidad=float(max(probability)),
            riesgo_nivel=int(prediction),
            recomendaciones=get_recommendations(prediction)
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
        "caracteristicas": ["edad_meses", "peso_kg", "talla_cm", "imc", "hemoglobina"],
        "categorias": ["Normal", "Riesgo de Desnutrición", "Desnutrición"]
    }

def get_recommendations(prediction: int) -> list:
    """
    Genera recomendaciones según la predicción
    """
    recommendations = {
        0: [
            "Mantener alimentación balanceada",
            "Continuar con controles de crecimiento regulares",
            "Asegurar ingesta adecuada de nutrientes"
        ],
        1: [
            "Consultar con un nutricionista pediátrico",
            "Aumentar frecuencia de comidas nutritivas",
            "Monitorear peso y talla semanalmente",
            "Considerar suplementos vitamínicos bajo supervisión médica"
        ],
        2: [
            "Atención médica urgente requerida",
            "Evaluación nutricional completa",
            "Plan de intervención nutricional intensivo",
            "Seguimiento médico semanal"
        ]
    }
    return recommendations.get(prediction, ["Consultar con un profesional de la salud"])
