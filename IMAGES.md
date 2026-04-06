# Guía de Imágenes - Rubén Fidalgo Blog

## Ubicación de Imágenes

Todas las imágenes del proyecto deben almacenarse en:
```
/public/images/
```

## Cómo Agregar Imágenes

### 1. Copiar Imagen
Copia la imagen a `/public/images/` usando tu gestor de archivos o terminal:

```bash
cp ruta/a/imagen.jpg /home/vic/Descargas/proyectos/ruben-blog/public/images/
```

### 2. Referenciar en Posts
En tu archivo Markdown, usa la ruta relativa:

```markdown
![Descripción de la imagen](/images/imagen.jpg)
```

### 3. Referenciar en Frontmatter
Para la imagen destacada del post:

```markdown
---
title: Mi Post
date: 2026-03-15
excerpt: Extracto
image: /images/imagen.jpg
category: desarrollo
---
```

## Formatos Soportados

- ✓ JPG/JPEG
- ✓ PNG
- ✓ WebP
- ✓ GIF

## Recomendaciones

### Tamaño de Archivo
- **Imágenes destacadas**: 800x600px (óptimo)
- **Tamaño máximo**: 5MB por imagen
- **Compresión**: Usa herramientas como TinyPNG para optimizar

### Formatos Recomendados
1. **WebP**: Mejor compresión (si el navegador soporta)
2. **PNG**: Para imágenes con transparencia
3. **JPG**: Para fotos

### Nombre de Archivos
- Usa nombres descriptivos
- Evita espacios en blanco
- Usa guiones: `mi-imagen.jpg` no `mi imagen.jpg`

## Descargando Imágenes del Sitio Original

Si necesitas las imágenes del sitio original (https://fidalgoruben.com/), puedes:

1. **Descargar manualmente**:
   - Visita el post en el navegador
   - Click derecho en la imagen → Guardar imagen como
   - Guarda en `/public/images/`

2. **Usar un script** (ejemplo):
```bash
wget -P public/images/ "https://fidalgoruben.com/wp-content/uploads/2026/03/PRODUCTIVIDAD-2.png"
```

## Estructura de Directorios

```
public/
└── images/
    ├── productividad.png
    ├── habitos.png
    ├── presion.png
    ├── visualizacion.png
    └── ... más imágenes
```

## URLs de Imágenes del Sitio Original

Aquí están las principales imágenes del sitio original para referencia:

- https://fidalgoruben.com/wp-content/uploads/2026/03/PRODUCTIVIDAD-2.png
- https://fidalgoruben.com/wp-content/uploads/2026/04/pexels-jesuszecuaphoto-33629446-1020x1536.jpg
- https://fidalgoruben.com/wp-content/uploads/2026/03/pexels-betosval-16566965-1024x683.jpg
- https://fidalgoruben.com/wp-content/uploads/2026/02/pexels-meruyert-gonullu-6888760-709x1024.jpg

Y muchas más disponibles en el sitio.

## Troubleshooting

### La imagen no se muestra
1. Verifica que el archivo existe en `/public/images/`
2. Comprueba el nombre exacto (sensible a mayúsculas)
3. Asegúrate de usar `/images/` (con barra inicial)

### La imagen se ve pixelada
- Usa una imagen más grande
- Reduce el zoom del navegador
- Exporta con mayor resolución

## Optimizar Imágenes

### Con ImageMagick (Linux)
```bash
convert imagen.jpg -resize 800x600 imagen-optimizada.jpg
convert imagen.png -strip imagen-optimizado.png
```

### Con herramientas online
- TinyPNG: https://tinypng.com
- ImageOptim: https://imageoptim.com
- Squoosh: https://squoosh.app

---

Para más ayuda, consulta el README.md principal.
