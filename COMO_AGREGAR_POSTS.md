# 📝 Guía: Cómo Añadir Nuevos Posts

## ✅ Ya está actualizado!

Las historias ahora **solo muestran posts que tengan imagen**.

Si un post no tiene imagen (field `image` vacío), no aparecerá en las stories de la cabecera.

---

## 🚀 Cómo Agregar un Nuevo Post

### Opción 1: MANUAL (Rápido)

#### 1. Crear el archivo Markdown

Crea un archivo en la carpeta `posts/` con este nombre:
```
posts/tu-titulo-del-post.md
```

#### 2. Copiar el template

Abre cualquier post actual y copia su estructura:

```markdown
---
title: "Título del nuevo post"
date: 2026-04-06
excerpt: "Resumen de 1-2 líneas"
image: "/images/nombre-imagen.jpg"
category: "mentalidad"
---

# Título del nuevo post

Contenido del post aquí en Markdown...

## Subtítulo

Más contenido...

- Punto 1
- Punto 2
```

#### 3. Campos Requeridos:

| Campo | Tipo | Ejemplo | Obligatorio |
|-------|------|---------|-------------|
| `title` | String | "Mi nuevo post" | ✅ Sí |
| `date` | Fecha | 2026-04-06 | ✅ Sí |
| `excerpt` | String | "Resumen corto" | ✅ Sí |
| `image` | Ruta | "/images/foto.jpg" | ⚠️ Para stories |
| `category` | String | "mentalidad", "desarrollo", "vida-activa" | ✅ Sí |

#### 4. Agregar la imagen (IMPORTANTE)

Para que tu post aparezca en las **stories de la cabecera**, NECESITA imagen.

**Ubicación de imágenes:** `public/images/`

Ejemplo:
```markdown
image: "/images/mi-nueva-imagen.jpg"
```

---

## 🖼️ Cómo Agregar Imágenes

### Paso 1: Descargar o tomar la imagen

- Tamaño recomendado: 800x450px (16:9)
- Formatos: JPG, PNG
- Peso máximo: 500KB

### Paso 2: Guardar en la carpeta correcta

Copia la imagen a:
```
public/images/nombre-de-la-imagen.jpg
```

### Paso 3: Referenciar en el post

En el frontmatter del post:
```markdown
---
image: "/images/nombre-de-la-imagen.jpg"
---
```

---

## 📋 Ejemplo Completo

### Archivo: `posts/mi-nuevo-post.md`

```markdown
---
title: "El poder del hábito diario"
date: 2026-04-07
excerpt: "Pequeños hábitos, grandes resultados"
image: "/images/habito-del-dia.jpg"
category: "desarrollo"
---

# El poder del hábito diario

Los hábitos son la base del cambio duradero. Cuando creas un hábito, 
no necesitas motivación, necesitas solo consistencia.

## Los 3 pilares del hábito

1. **La señal** - El disparador
2. **La rutina** - La acción
3. **La recompensa** - El beneficio

### Ejemplo práctico

Si tu objetivo es hacer ejercicio cada mañana:
- Señal: Sonar el despertador a las 6am
- Rutina: 30 minutos de ejercicio
- Recompensa: Desayuno delicioso

La consistencia es más importante que la intensidad.

Mejor: **30 minutos diarios** que una hora esporádica.

---

*Publicado el 7 de abril de 2026*
```

---

## 🎯 Resultado

Después de crear el post:

1. ✅ Aparecerá en `/blog` automáticamente
2. ✅ Tendrá su propia URL: `/blog/mi-nuevo-post`
3. ✅ Si tiene imagen, aparecerá en las **stories de la cabecera**
4. ✅ Se filtrará por categoría
5. ✅ Aparecerá en la API: `/api/posts`

---

## 📁 Estructura de Carpetas

```
ruben-blog/
├── posts/                    ← Aquí van los posts
│   ├── post-1.md
│   ├── post-2.md
│   └── tu-nuevo-post.md     ← CREA AQUÍ
│
├── public/
│   └── images/              ← Aquí van las imágenes
│       ├── imagen1.jpg
│       └── tu-imagen.jpg    ← GUARDA AQUÍ
│
└── src/
    ├── app/
    ├── components/
    └── lib/
```

---

## ✨ Categorías Disponibles

Usa una de estas categorías en tus posts:

- `mentalidad` - Posts sobre mindset, emociones, psicología
- `desarrollo` - Posts sobre crecimiento personal, habilidades
- `vida-activa` - Posts sobre ejercicio, salud, actividad física

---

## 🔄 Cómo los Posts se Actualizan

1. **Desarrollo Local:**
   - Creas el archivo `.md`
   - El servidor se recarga automáticamente
   - El post aparece de inmediato en `/blog`

2. **En Producción (Hostinger):**
   - Sube el nuevo archivo `.md` a la carpeta `posts/`
   - Reinicia la aplicación: `npm start`
   - El post aparece automáticamente

---

## 🚫 Errores Comunes

### ❌ "El post no aparece"
**Solución:** 
- ¿Está el archivo en `posts/` con extensión `.md`?
- ¿El YAML frontmatter está correcto? (entre `---` y `---`)
- ¿Tienes todos los campos requeridos?

### ❌ "La imagen no aparece"
**Solución:**
- ¿La imagen está en `public/images/`?
- ¿El campo `image` empieza con `/images/`?
- ¿El nombre del archivo es exacto (mayúsculas/minúsculas)?

### ❌ "No aparece en las stories"
**Solución:**
- ¿El post tiene el campo `image`?
- ¿La imagen existe en `public/images/`?
- Solo se muestran los 8 primeros posts **con imagen**

---

## 💡 Tips Útiles

### Para el título
- Usa interrogaciones: "¿Qué es la mentalidad ganadora?"
- Usa acciones: "Entrena tu mente como tu cuerpo"
- Máximo 60 caracteres para mejor SEO

### Para el excerpt
- 1-2 líneas máximo
- Resumen atractivo que haga click
- 100-150 caracteres

### Para las imágenes
- Usa imágenes de alta calidad
- Relacionadas con el contenido
- Comprime antes de subir (herramientas: TinyPNG, Compressor.io)
- Los posts sin imagen no aparecen en stories

### Para el contenido
- Usa encabezados (# ## ###)
- Usa listas (- •)
- Usa **negrita** para destacar
- Usa *cursiva* para énfasis
- Deja líneas en blanco entre párrafos

---

## 📱 Vista Previa en Desarrollo

Mientras estés editando localmente:

1. Crea/edita el post
2. La web recarga automáticamente (http://localhost:3000)
3. Visita `/blog` para ver el nuevo post
4. Si tiene imagen, aparecerá en las stories

---

## 🚀 Una Vez en Producción (Hostinger)

Para agregar un post nuevo en vivo:

1. Accede vía SSH/File Manager a tu servidor
2. Sube el archivo `.md` a `posts/`
3. Sube la imagen a `public/images/`
4. Reinicia: `npm start` (o desde el panel de Hostinger)
5. ¡Listo! El post está en vivo

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo editar un post existente?**
A: Sí, solo edita el archivo `.md` y guarda. Se actualiza automáticamente.

**P: ¿Puedo cambiar la categoría de un post?**
A: Sí, cambia el campo `category` en el frontmatter.

**P: ¿Puedo cambiar la fecha?**
A: Sí, modifica el campo `date`. Se ordena por fecha (más reciente primero).

**P: ¿Qué pasa si elimino un archivo?**
A: Desaparece del blog automáticamente (no se borra nada más).

**P: ¿Puedo tener markdown avanzado?**
El editor soporta:
- Tablas
- Código (con resaltado)
- Citas
- Listas anidadas
- Links
- Imágenes en el contenido

---

## 📞 Resumen Rápido

```
1. Crear: posts/mi-post.md
2. Añadir campos YAML (title, date, excerpt, category, image)
3. Escribir contenido en Markdown
4. Guardar imagen en public/images/
5. Listo! Aparece automáticamente
```

**¡Es tan simple como crear un archivo de texto!** 📝

Cualquier pregunta, revisa la estructura de un post existente.
