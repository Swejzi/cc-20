#!/bin/bash

# Pull latest Docker images
docker-compose pull

# Restart containers
docker-compose down
docker-compose up -d

echo "Update of ChainCamp 2.0 application completed"
