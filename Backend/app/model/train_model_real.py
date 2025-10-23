import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import joblib
import os

def calcular_imc(peso, talla):
    """Calcula el IMC (Índice de Masa Corporal)"""
    return peso / ((talla / 100) ** 2)

def clasificar_desnutricion(row):
    """
    Clasifica el estado nutricional según criterios OMS adaptados:
    - Perímetro braquial: Indicador clave en menores de 5 años
      < 11.5 cm: Desnutrición Aguda Severa
      11.5-12.5 cm: Riesgo
      > 12.5 cm: Normal
    - IMC (peso/talla²)
    - Edad y desarrollo
    """
    imc = row['imc']
    edad = row['edad_meses']
    per_braqu = row['per_braqu_cm']
    
    # Perímetro braquial es el indicador más confiable si está disponible
    if pd.notna(per_braqu) and per_braqu > 0:
        if per_braqu < 11.5:
            return 'Desnutrición'
        elif per_braqu < 12.5:
            return 'Riesgo'
        else:
            return 'Normal'
    
    # Si no hay perímetro braquial, usar IMC
    # Criterios ajustados para menores de 5 años
    if edad <= 6:  # 0-6 meses
        if imc < 13:
            return 'Desnutrición'
        elif imc < 14:
            return 'Riesgo'
        else:
            return 'Normal'
    elif edad <= 12:  # 7-12 meses
        if imc < 14:
            return 'Desnutrición'
        elif imc < 15:
            return 'Riesgo'
        else:
            return 'Normal'
    elif edad <= 24:  # 13-24 meses
        if imc < 14.5:
            return 'Desnutrición'
        elif imc < 15.5:
            return 'Riesgo'
        else:
            return 'Normal'
    elif edad <= 36:  # 25-36 meses
        if imc < 14:
            return 'Desnutrición'
        elif imc < 15:
            return 'Riesgo'
        else:
            return 'Normal'
    else:  # 37-60 meses
        if imc < 13.5:
            return 'Desnutrición'
        elif imc < 14.5:
            return 'Riesgo'
        else:
            return 'Normal'

def preparar_datos():
    """Carga y prepara los datos del CSV real"""
    print("📂 Cargando datos desde CSV...")
    
    # Ruta del archivo CSV
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'datos_desnutricion.csv')
    df = pd.read_csv(csv_path)
    
    print(f"✅ Datos cargados: {len(df)} registros")
    
    # Convertir edad a meses según unidad de medida
    # uni_med_: 1=meses, 2=años, 3=días
    df['edad_meses'] = df.apply(lambda row: 
        row['edad_'] if row['uni_med_'] == 1
        else row['edad_'] * 12 if row['uni_med_'] == 2
        else row['edad_'] / 30 if row['uni_med_'] == 3
        else row['edad_'], axis=1)
    
    # Convertir valores numéricos
    df['peso_kg'] = pd.to_numeric(df['peso_act'], errors='coerce')
    df['talla_cm'] = pd.to_numeric(df['talla_act'], errors='coerce')
    df['per_braqu_cm'] = pd.to_numeric(df['per_braqu'], errors='coerce')
    
    # Filtrar solo menores de 5 años (60 meses) con datos válidos
    df_clean = df[(df['edad_meses'] > 0) & (df['edad_meses'] <= 60)].copy()
    df_clean = df_clean[(df_clean['peso_kg'] > 0) & (df_clean['talla_cm'] > 0)]
    
    print(f"🧹 Datos limpios (menores de 5 años): {len(df_clean)} registros")
    
    # Calcular IMC
    df_clean['imc'] = df_clean.apply(
        lambda row: calcular_imc(row['peso_kg'], row['talla_cm']), axis=1
    )
    
    # Clasificar estado nutricional
    df_clean['categoria'] = df_clean.apply(clasificar_desnutricion, axis=1)
    
    # Mostrar distribución de categorías
    print("\n📊 Distribución de categorías:")
    print(df_clean['categoria'].value_counts())
    print(f"\nPorcentajes:")
    print(df_clean['categoria'].value_counts(normalize=True) * 100)
    
    # Seleccionar características para el modelo
    # Nota: No usamos hemoglobina porque no está en el CSV original
    # Usamos perímetro braquial cuando está disponible
    features = ['edad_meses', 'peso_kg', 'talla_cm', 'imc']
    
    # Agregar perímetro braquial si está disponible (rellenar con 0 si no)
    df_clean['per_braqu_cm'] = df_clean['per_braqu_cm'].fillna(0)
    features.append('per_braqu_cm')
    
    X = df_clean[features]
    y = df_clean['categoria']
    
    return X, y, df_clean

def entrenar_modelo():
    """Entrena el modelo de Random Forest con datos reales"""
    print("\n🤖 ENTRENAMIENTO DEL MODELO CON DATOS REALES\n")
    print("=" * 60)
    
    # Preparar datos
    X, y, df_clean = preparar_datos()
    
    # Dividir en entrenamiento y prueba (80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"\n📚 Conjunto de entrenamiento: {len(X_train)} registros")
    print(f"🧪 Conjunto de prueba: {len(X_test)} registros")
    
    # Entrenar Random Forest
    print("\n⚙️ Entrenando Random Forest Classifier...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    # Evaluar modelo
    y_pred = model.predict(X_test)
    accuracy = model.score(X_test, y_test)
    
    print(f"\n✅ Precisión del modelo: {accuracy:.2%}")
    
    # Reporte detallado
    print("\n📋 Reporte de Clasificación:")
    print(classification_report(y_test, y_pred))
    
    # Matriz de confusión
    print("\n🔢 Matriz de Confusión:")
    print(confusion_matrix(y_test, y_pred))
    
    # Importancia de características
    print("\n🎯 Importancia de características:")
    feature_names = ['edad_meses', 'peso_kg', 'talla_cm', 'imc', 'per_braqu_cm']
    for name, importance in zip(feature_names, model.feature_importances_):
        print(f"  {name}: {importance:.4f}")
    
    # Guardar modelo
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    joblib.dump(model, model_path)
    print(f"\n💾 Modelo guardado en: {model_path}")
    
    # Estadísticas de los datos
    print("\n📊 Estadísticas de los datos de entrenamiento:")
    print(df_clean[['edad_meses', 'peso_kg', 'talla_cm', 'imc', 'per_braqu_cm']].describe())
    
    return model

if __name__ == "__main__":
    entrenar_modelo()
