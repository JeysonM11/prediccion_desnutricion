"""
Punto de entrada FastAPI para el sistema de predicción de desnutrición
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict

app = FastAPI(
    title="API de Predicción de Desnutrición",
    description="Sistema de predicción de riesgo de desnutrición infantil",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(predict.router, prefix="/api", tags=["Predicción"])

@app.get("/")
async def root():
    return {
        "message": "API de Predicción de Desnutrición",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
