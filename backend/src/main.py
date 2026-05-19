from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os

app = FastAPI(title="Diabetes Prediction API")

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler relative to main.py path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, '../models/xgboost_model.pkl')
scaler_path = os.path.join(BASE_DIR, '../models/scaler.pkl')

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

class DiabetesInput(BaseModel):
    BMI: float
    HighBP: int
    HighChol: int
    Age: int
    GenHlth: int
    PhysActivity: int
    Smoker: int
    HeartDiseaseorAttack: int
    DiffWalk: int
    CholCheck: int

@app.get("/")
def home():
    return {"message": "Diabetes Prediction API Running"}

@app.post("/predict")
def predict(data: DiabetesInput):
    # Convert input data to list
    raw_data = [
        data.BMI,
        data.HighBP,
        data.HighChol,
        data.Age,
        data.GenHlth,
        data.PhysActivity,
        data.Smoker,
        data.HeartDiseaseorAttack,
        data.DiffWalk,
        data.CholCheck
    ]

    # Convert to DataFrame with training feature names to suppress warnings and ensure exact feature alignment
    feature_names = [
        'BMI',
        'HighBP',
        'HighChol',
        'Age',
        'GenHlth',
        'PhysActivity',
        'Smoker',
        'HeartDiseaseorAttack',
        'DiffWalk',
        'CholCheck'
    ]
    df_data = pd.DataFrame([raw_data], columns=feature_names)

    scaled_data = scaler.transform(df_data)

    prediction = model.predict(scaled_data)[0]

    # Get probability for the predicted class
    probability = model.predict_proba(scaled_data)[0][int(prediction)]

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }

# Serve React Frontend
app.mount(
    "/assets",
    StaticFiles(directory="../../frontend/dist/assets"),
    name="assets"
)

@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    return FileResponse("../../frontend/dist/index.html")
