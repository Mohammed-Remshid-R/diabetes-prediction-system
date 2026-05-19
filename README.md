# 🩺 Premium Diabetes Prediction System

A full-stack clinical health risk assessment platform powered by **FastAPI** on the backend and **React (Vite + Tailwind CSS)** on the frontend. The system evaluates a patient's risk index for diabetes across 3 classes using an optimized **XGBoost Classifier** trained with SMOTE class balancing on the CDC BRFSS dataset.

---

## 🏗️ Project Architecture

```
diabetes_prediction_system/
│
├── backend/
│   ├── data/                 # Raw and processed scale datasets
│   ├── models/               # Serialized models and scalers (Pickles)
│   ├── src/
│   │   ├── data_preprocessing.py
│   │   ├── train_model.py
│   │   ├── predict.py
│   │   └── main.py           # FastAPI Application Entrypoint
│   │
│   └── requirements.txt      # Backend Python Dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main Premium Dashboard Component
│   │   ├── main.jsx
│   │   └── index.css         # Tailwind Imports
│   │
│   ├── package.json          # Frontend Node Packages
│   └── vite.config.js        # Vite Build configuration
│
└── README.md                 # Project Documentation
```

---

## ⚡ Setup & Launch Instructions

To launch the full-stack system, run the backend FastAPI server and the React frontend development server concurrently.

### 🐍 Part 1: Start the FastAPI Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI development server using Uvicorn:
   ```bash
   python -m uvicorn src.main:app --host 127.0.0.1 --port 8000
   ```
   *The backend will be running at:* `http://127.0.0.1:8000`

---

### ⚛️ Part 2: Start the React Frontend

1. Navigate to the `frontend/` directory:
   ```bash
   cd ../frontend
   ```
2. Install the Node packages:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The frontend dashboard will open at:* `http://localhost:5173/`

---

## 📊 Features & Premium Design Touches

* **100% High-Fidelity Design Replication**: Features a vibrant indigo-to-teal vertical gradient sidebar, customized sliding grids, matching select fields, and a modern blood-glucose meter SVG illustration.
* **XGBoost Machine Learning**: Re-engineered feature set utilizing **10 highly predictive metrics** to deliver real-time evaluations from your custom-trained machine learning pickles.
* **Interactive UI Bindings**: Integrated sliders with clean right-aligned readout panels and descriptive legends representing actual health indicators.
* **Precise Analytics & Progress Indicators**: Interactive progress bar indicating the exact risk probability along with targeted medical take-care tips.