FROM python:3.11

WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm

# Copy project
COPY . .

# Install backend dependencies
RUN pip install -r backend/requirements.txt

# Build frontend
WORKDIR /app/frontend

RUN npm install
RUN npm run build

# Return to backend
WORKDIR /app/backend

EXPOSE 7860

CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "7860"]
