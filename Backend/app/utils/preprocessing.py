"""
Utilidades para preprocesamiento y limpieza de datos
"""
import numpy as np
from app.schemas.input_schema import PredictionInput

def preprocess_input(data: PredictionInput) -> list:
    """
    Preprocesa y normaliza los datos de entrada para el modelo
    
    Args:
        data: Datos de entrada validados
        
    Returns:
        Lista de características normalizadas
    """
    # Extraer características
    features = [
        data.edad_meses,
        data.peso_kg,
        data.talla_cm,
        data.imc if data.imc is not None else calculate_imc(data.peso_kg, data.talla_cm),
        data.hemoglobina
    ]
    
    # Aplicar normalización si es necesario
    # features = normalize_features(features)
    
    return features

def calculate_imc(peso_kg: float, talla_cm: float) -> float:
    """
    Calcula el Índice de Masa Corporal
    
    Args:
        peso_kg: Peso en kilogramos
        talla_cm: Talla en centímetros
        
    Returns:
        IMC calculado
    """
    talla_m = talla_cm / 100
    return peso_kg / (talla_m ** 2)

def normalize_features(features: list) -> list:
    """
    Normaliza las características usando min-max scaling
    
    Args:
        features: Lista de características crudas
        
    Returns:
        Lista de características normalizadas
    """
    # Rangos aproximados para cada característica
    ranges = {
        'edad_meses': (0, 60),
        'peso_kg': (2, 30),
        'talla_cm': (45, 120),
        'imc': (10, 25),
        'hemoglobina': (5, 15)
    }
    
    normalized = []
    for i, (feature, (min_val, max_val)) in enumerate(zip(features, ranges.values())):
        normalized_value = (feature - min_val) / (max_val - min_val)
        normalized.append(np.clip(normalized_value, 0, 1))
    
    return normalized

def validate_data_quality(data: PredictionInput) -> dict:
    """
    Valida la calidad de los datos de entrada
    
    Args:
        data: Datos de entrada
        
    Returns:
        Diccionario con advertencias o validaciones
    """
    warnings = []
    
    # Validar rangos esperados para la edad
    if data.edad_meses < 6:
        warnings.append("Niño menor de 6 meses - considerar lactancia exclusiva")
    
    # Validar hemoglobina
    if data.hemoglobina < 11:
        warnings.append("Nivel de hemoglobina bajo - posible anemia")
    
    # Validar relación peso-talla
    imc = calculate_imc(data.peso_kg, data.talla_cm)
    if imc < 13:
        warnings.append("IMC muy bajo para la edad")
    elif imc > 20:
        warnings.append("IMC alto - considerar sobrepeso")
    
    return {
        "valido": True,
        "advertencias": warnings
    }
