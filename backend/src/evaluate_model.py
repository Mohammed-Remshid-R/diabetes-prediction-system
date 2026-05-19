import joblib
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# Load model
model = joblib.load('models/xgboost_model.pkl')

# Load test data
X_test = joblib.load('data/processed/X_test.pkl')
y_test = joblib.load('data/processed/y_test.pkl')

# Prediction
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy * 100:.2f}%")

# Confusion Matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Classification Report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))