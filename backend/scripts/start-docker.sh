#!/bin/sh
set -e

echo "Waiting for database..."
until npx sequelize-cli db:migrate; do
  echo "Database not ready, retrying in 3 seconds..."
  sleep 3
done

echo "Running seeders..."
npx sequelize-cli db:seed:all

echo "Starting backend..."
npm run dev
 