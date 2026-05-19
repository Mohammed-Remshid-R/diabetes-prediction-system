import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
import joblib

# Load dataset
df = pd.read_csv(
    'data/raw/diabetes_012_health_indicators_BRFSS2015.csv'
)


selected_features = [
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

X = df[selected_features]
y = df['Diabetes_012']

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Apply SMOTE
smote = SMOTE(random_state=42)

X_train, y_train = smote.fit_resample(X_train, y_train)

# Feature Scaling
scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save processed files
joblib.dump(X_train, 'data/processed/X_train.pkl')
joblib.dump(X_test, 'data/processed/X_test.pkl')
joblib.dump(y_train, 'data/processed/y_train.pkl')
joblib.dump(y_test, 'data/processed/y_test.pkl')
joblib.dump(scaler, 'models/scaler.pkl')

print("Preprocessing completed successfully")