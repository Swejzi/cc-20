#!/bin/bash

# Create configuration file if it doesn't exist
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "Created configuration file .env from .env.example"
  else
    touch .env
    echo "Created empty .env file"
  fi
fi

# Start Docker containers
docker-compose up -d

# Add host to Nginx Proxy Manager
add-nginx-host -h chaincamp20.swejzi.cz -c chaincamp20-swejzi-frontend -p 3000

echo "Installation of ChainCamp 2.0 application completed"
