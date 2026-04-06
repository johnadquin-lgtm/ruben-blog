# Rubén Fidalgo - Blog de Coaching Deportivo

Una aplicación web moderna y completa para blog y portafolio de Rubén Fidalgo, especializado en coaching deportivo y desarrollo personal.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con Tailwind CSS
- **Blog Dinámico**: Sistema de posts en Markdown con soporte para metadatos
- **Categorización**: Organiza posts por categorías
- **Rendimiento Optimizado**: Prerendering estático de contenido
- **Responsive Design**: Compatible con dispositivos móviles
- **SEO Friendly**: Estructura semántica y metadatos optimizados

## 📁 Estructura del Proyecto

```
ruben-blog/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal
│   │   ├── layout.tsx            # Layout global
│   │   ├── blog/
│   │   │   ├── page.tsx          # Listado de blogs
│   │   │   ├── blog-client.tsx   # Componente cliente
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Post individual
│   │   ├── api/
│   │   │   └── posts/
│   │   │       └── route.ts      # API para obtener posts
│   │   └── globals.css           # Estilos globales
│   ├── components/
│   │   ├── Header.tsx            # Encabezado navegación
│   │   ├── Footer.tsx            # Pie de página
│   │   ├── PostCard.tsx          # Tarjeta de post
│   │   └── MarkdownRenderer.tsx  # Renderizador de Markdown
│   └── lib/
│       └── posts.ts              # Funciones para leer posts
├── posts/                         # Directorio de posts en Markdown
│   └── *.md                      # Archivos de posts
├── public/                        # Archivos estáticos
└── package.json
```

## 📝 Cómo Agregar Posts

### 1. Crear Archivo Markdown
Crea un nuevo archivo en la carpeta `posts/` con extensión `.md`:

```bash
posts/mi-nuevo-post.md
```

### 2. Estructura del Post
Cada post debe incluir YAML frontmatter al inicio:

```markdown
---
title: Título del Post
date: 2026-03-15
excerpt: Descripción corta del artículo
image: /images/imagen.png
category: mentalidad
---

# Contenido del Post

Tu contenido aquí en Markdown...
```

### 3. Campos Disponibles

- **title** (requerido): Título del post
- **date** (requerido): Fecha en formato YYYY-MM-DD
- **excerpt** (requerido): Descripción corta
- **image** (opcional): Ruta de imagen
- **category** (opcional): Categoría del post

### 4. Ejemplo Completo

```markdown
---
title: La importancia de la mentalidad
date: 2026-03-10
excerpt: Descubre cómo tu mentalidad determina tu rendimiento
image: /images/mentalidad.png
category: mentalidad
---

# La importancia de la mentalidad

El factor más importante en cualquier deporte es la mente...

## Sección importante

Contenido aquí...

- Punto 1
- Punto 2
- Punto 3
```

## 🛠 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar compilado
npm run start

# Linting
npm run lint
```

## 🌐 Acceder a la Aplicación

Una vez ejecutado `npm run dev`:

- **Inicio**: http://localhost:3000
- **Blog**: http://localhost:3000/blog
- **Post**: http://localhost:3000/blog/slug-del-post

## 📦 Dependencias Principales

- **Next.js 16.2**: Framework React optimizado
- **TypeScript**: Type safety
- **Tailwind CSS**: Estilos utilities
- **gray-matter**: Parser de YAML/Markdown
- **react-markdown**: Renderizador de Markdown

## 🎨 Personalización

### Colores Principales
Los colores principales están en azul (blue-600, blue-800) y se pueden modificar:
- En componentes individuales (Tailwind classes)
- Consulta la documentación de Tailwind para cambios globales

### Información del Sitio
- **Header**: Edita `src/components/Header.tsx`
- **Footer**: Edita `src/components/Footer.tsx`
- **Página Principal**: Edita `src/app/page.tsx`

## 📧 Contacto
Datos de contacto en `src/app/page.tsx` sección de contacto.

## 🚀 Desplegar

### Verificación previa
```bash
npm run build
npm run lint
```

### Desplegar en Vercel (Recomendado)

1. Conecta el repositorio a [Vercel](https://vercel.com)
2. La compilación se hará automáticamente
3. Tu sitio estará en vivo

### Desplegar en otros servidores

```bash
npm run build
npm run start
```

## 📝 Notas

- Los posts se cargan automáticamente desde `posts/`
- El slug del URL se genera del nombre del archivo
- Los posts se ordenan por fecha (más reciente primero)
- Las imágenes se almacenan en `public/images/`

---

**Creado con Next.js 16.2, TypeScript y Tailwind CSS**
