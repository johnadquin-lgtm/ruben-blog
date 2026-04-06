#!/bin/bash
# Script para iniciar el proyecto Rubén Fidalgo Blog

echo "🚀 Iniciando Rubén Fidalgo Blog..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instálalo desde https://nodejs.org"
    exit 1
fi

echo "✓ Node.js encontrado: $(node --version)"
echo "✓ npm: $(npm --version)"
echo ""

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Iniciar servidor de desarrollo
echo "🎯 Iniciando servidor de desarrollo..."
echo "📍 Abre tu navegador en: http://localhost:3000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

npm run dev
