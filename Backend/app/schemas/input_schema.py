"""
Esquemas de validación de datos de entrada y salida
"""
from pydantic import BaseModel, Field, validator
from typing import Optional

class PredictionInput(BaseModel):
    """
    Esquema para los datos de entrada de predicción
    """
    edad_meses: int = Field(..., ge=0, le=60, description="Edad del niño en meses (0-60)")
    peso_kg: float = Field(..., gt=0, le=30, description="Peso del niño en kilogramos")
    talla_cm: float = Field(..., gt=0, le=120, description="Talla del niño en centímetros")
    imc: Optional[float] = Field(None, ge=0, le=30, description="Índice de masa corporal")
    hemoglobina: float = Field(..., gt=0, le=20, description="Nivel de hemoglobina en g/dL")
    
    @validator('imc', always=True)
    def calculate_imc(cls, v, values):
        """
        Calcula el IMC si no se proporciona
        """
        if v is None:
            if 'peso_kg' in values and 'talla_cm' in values:
                peso = values['peso_kg']
                talla_m = values['talla_cm'] / 100
                return peso / (talla_m ** 2)
        return v
    
    class Config:
        schema_extra = {
            "example": {
                "edad_meses": 24,
                "peso_kg": 12.5,
                "talla_cm": 85.0,
                "hemoglobina": 11.5
            }
        }

class PredictionOutput(BaseModel):
    """
    Esquema para la respuesta de predicción
    """
    categoria: str = Field(..., description="Categoría de diagnóstico")
    probabilidad: float = Field(..., ge=0, le=1, description="Probabilidad de la predicción")
    riesgo_nivel: int = Field(..., ge=0, le=2, description="Nivel de riesgo (0: Normal, 1: Riesgo, 2: Desnutrición)")
    recomendaciones: list[str] = Field(..., description="Lista de recomendaciones")
    
    class Config:
        schema_extra = {
            "example": {
                "categoria": "Normal",
                "probabilidad": 0.85,
                "riesgo_nivel": 0,
                "recomendaciones": [
                    "Mantener alimentación balanceada",
                    "Continuar con controles de crecimiento regulares"
                ]
            }
        }
