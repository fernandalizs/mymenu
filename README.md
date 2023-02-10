# My Menu
My Menu is an app where you can save your daily meals and favorite recipes at the same place 🍽️
## Requirements
- Node v14
- Vue-cli
- Docker 
- Docker compose
## Project Setup
```bash
# Install vue-cli
npm install -g @vue/cli

# Create the containers
docker compose build

# Start the containers
docker compose up

# Use the mockapi
docker-compose -f docker-compose.yml -f docker-compose.apimock.yml up frontend

# Stop the containers
docker compose down

# Create superuser
docker-compose exec backend ./manage.py createsuperuser

# Change owner
sudo chown 1000:1000 -Rf frontend/
cd frontend
npm install

# Lint
npm run lint
```
