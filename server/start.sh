#!/bin/sh
# Usamos /bin/sh para ser mais portável

# Garante que o script pare se algum comando falhar
set -e

echo "✅ Running database migrations..."
# O pnpx garante que o CLI do Prisma (listado em devDependencies) seja usado
pnpx prisma migrate deploy

echo "🚀 Starting the application..."
# O comando 'exec' substitui o processo do shell pelo processo do Node.js.
# "$@" passa quaisquer argumentos recebidos pelo script para o comando final.
exec "$@"