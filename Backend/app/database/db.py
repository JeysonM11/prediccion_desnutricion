"""
Configuración y conexión a la base de datos
"""
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# URL de conexión a la base de datos (ejemplo con SQLite)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./predicciones.db")

# Crear motor de base de datos
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Crear sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

# Modelo de base de datos para predicciones
class Prediccion(Base):
    __tablename__ = "predicciones"
    
    id = Column(Integer, primary_key=True, index=True)
    edad_meses = Column(Integer)
    peso_kg = Column(Float)
    talla_cm = Column(Float)
    imc = Column(Float)
    hemoglobina = Column(Float)
    categoria = Column(String)
    probabilidad = Column(Float)
    riesgo_nivel = Column(Integer)
    fecha_prediccion = Column(DateTime, default=datetime.utcnow)

# Crear tablas
def init_db():
    """
    Inicializa la base de datos
    """
    Base.metadata.create_all(bind=engine)
    print("Base de datos inicializada correctamente")

# Dependencia para obtener sesión de base de datos
def get_db():
    """
    Generador de sesión de base de datos
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Guardar predicción en la base de datos
def save_prediction(db, input_data, output_data):
    """
    Guarda una predicción en la base de datos
    
    Args:
        db: Sesión de base de datos
        input_data: Datos de entrada
        output_data: Resultado de la predicción
    """
    prediccion = Prediccion(
        edad_meses=input_data.edad_meses,
        peso_kg=input_data.peso_kg,
        talla_cm=input_data.talla_cm,
        imc=input_data.imc,
        hemoglobina=input_data.hemoglobina,
        categoria=output_data.categoria,
        probabilidad=output_data.probabilidad,
        riesgo_nivel=output_data.riesgo_nivel
    )
    db.add(prediccion)
    db.commit()
    db.refresh(prediccion)
    return prediccion

if __name__ == "__main__":
    init_db()
