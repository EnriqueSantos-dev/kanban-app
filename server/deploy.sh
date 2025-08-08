#!/bin/bash
set -e

echo "Buildando a imagem Docker..."
docker compose --env-file ../config/.env build

echo "Subindo containers com docker compose..."
docker compose --env-file ../config/.env up -d --remove-orphans

echo "Deploy concluído."
