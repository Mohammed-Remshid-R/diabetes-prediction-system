import joblib
from xgboost import XGBClassifier

# Load processed data
X_train = joblib.load('data/processed/X_train.pkl')
y_train = joblib.load('data/processed/y_train.pkl')

# Create model
model = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'models/xgboost_model.pkl')

print("Model trained and saved successfully")