#!/bin/sh

echo "Preparing the environment..."

# Copy env file
cp .env.example .env

bun install

if [ -d ".husky" ]; then
  bunx husky install
  echo "✅ Git hooks configured"
fi

echo "Done"