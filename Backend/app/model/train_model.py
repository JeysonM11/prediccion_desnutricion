"""
Entrenamiento y guardado del modelo de predicción de desnutrición
"""
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd

def train_model():
    """
    Entrena el modelo de predicción de desnutrición
    """
    # Datos de ejemplo (reemplazar con datos reales)
    # Características: edad_meses, peso_kg, talla_cm, imc, hemoglobina
    X = np.array([
        [24, 12.5, 85, 17.3, 11.5],
        [36, 14.2, 95, 15.7, 12.1],
        [18, 10.8, 78, 17.8, 10.5],
        [48, 16.5, 102, 15.9, 12.5],
        [30, 13.1, 90, 16.2, 11.8],
        # Agregar más datos de entrenamiento
    ])
    
    # Etiquetas: 0 = No desnutrido, 1 = Riesgo, 2 = Desnutrido
    y = np.array([0, 0, 1, 0, 1])
    
    # Dividir datos
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Entrenar modelo
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluar
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Precisión del modelo: {accuracy:.2f}")
    
    # Guardar modelo
    with open('app/model/model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("Modelo guardado exitosamente en app/model/model.pkl")
    return model

def load_model():
    """
    Carga el modelo entrenado
    """
    try:
        with open('app/model/model.pkl', 'rb') as f:
            model = pickle.load(f)
        return model
    except FileNotFoundError:
        print("Modelo no encontrado. Entrenando nuevo modelo...")
        return train_model()

if __name__ == "__main__":
    train_model()
