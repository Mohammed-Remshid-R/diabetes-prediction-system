import joblib
import numpy as np
import pandas as pd

# Load model and scaler
model = joblib.load('models/xgboost_model.pkl')
scaler = joblib.load('models/scaler.pkl')

def predict_diabetes(data):
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
    
    # Create DataFrame to match training feature names and suppress warnings
    df_data = pd.DataFrame([data], columns=feature_names)

    scaled_data = scaler.transform(df_data)

    prediction = model.predict(scaled_data)

    probability = model.predict_proba(scaled_data)

    return prediction[0], probability[0][int(prediction[0])]