#!/bin/bash

# Script de preparación para deployment a Hostinger

echo "🚀 Preparando proyecto para deployment..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado"
    echo "Asegúrate de estar en la raíz del proyecto"
    exit 1
fi

echo "✓ Proyecto encontrado"
echo ""

# Limpiar compilación anterior
echo "🧹 Limpiando compilación anterior..."
rm -rf .next
echo "✓ Carpeta .next eliminada"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error instalando dependencias"
    exit 1
fi
echo "✓ Dependencias instaladas"
echo ""

# Hacer build de producción
echo "🏗️  Creando build de producción..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi
echo "✓ Build completado exitosamente"
echo ""

# Estadísticas
echo "📊 Estadísticas del proyecto:"
echo "   Total de posts: $(find posts -name '*.md' | wc -l)"
echo "   Imágenes: $(find public/images -type f | wc -l)"
echo "   Tamaño de .next: $(du -sh .next 2>/dev/null | cut -f1)"
echo ""

echo "✅ ¡Proyecto listo para subir a Hostinger!"
echo ""
echo "Próximos pasos:"
echo "1. Comprime el proyecto: tar -czf ruben-blog.tar.gz ."
echo "2. Sube el archivo a Hostinger vía FTP"
echo "3. Descomprime en tu servidor"
echo "4. Ejecuta: npm install --production && npm start"
echo ""
echo "O usa https://dashboard.hostinger.com para Node.js deployment"
