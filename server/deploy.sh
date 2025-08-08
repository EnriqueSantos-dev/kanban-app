#!/bin/bash
set -e

echo "Buildando a imagem Docker..."
docker compose build

echo "Subindo containers com docker compose..."
docker compose up -d --remove-orphans

echo "Deploy concluído."
