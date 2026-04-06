# Guía de Deployment a Hostinger

## ✅ Build Completado

El build de producción ha sido creado exitosamente. Las carpetas generadas son:
- `.next/` - Aplicación compilada
- `public/` - Archivos estáticos (imágenes, etc.)
- `node_modules/` - Dependencias

## 📋 Opciones de Deployment

### Opción 1: Node.js (Recomendado para Hostinger)

#### Requisitos:
- Node.js 18+ instalado en Hostinger
- npm o yarn disponible

#### Pasos:

1. **Subir los archivos a Hostinger:**
   ```bash
   # Vía FTP/SFTP o File Manager en Hostinger
   ```

   Estructura a subir:
   ```
   ruben-blog/
   ├── .next/
   ├── public/
   ├── node_modules/
   ├── package.json
   ├── package-lock.json
   ├── next.config.js
   └── tsconfig.json
   ```

2. **En Hostinger - Node.js Setup:**
   - Ve a: **Control Panel** → **Node.js**
   - Crea una nueva aplicación Node.js
   - Apunta el dominio a tu aplicación
   - Set the entry point: `npm start`
   - Node version: 18+
   - Environment: Production

3. **Instalar dependencias en Hostinger:**
   ```bash
   npm install --production
   ```

4. **Iniciar la aplicación:**
   - Hostinger lo hará automáticamente
   - Verifica en la consola del panel

---

### Opción 2: Static Export (Más simple)

Si prefieres un hosting de archivos estáticos:

1. **Modificar `next.config.js`:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   module.exports = nextConfig;
   ```

2. **Hacer nuevo build:**
   ```bash
   npm run build
   ```

3. **Subir solo la carpeta `out/` vía FTP:**
   - Todo el contenido de `out/` al `public_html/`

---

## 🔒 Variables de Entorno

Si necesitas variables (.env.local), en Hostinger:
1. Ve al **Node.js** application settings
2. Añade **Environment Variables**
3. Las variables necesarias son:
   - (Actualmente no hay variables requeridas)

---

## 🚀 Verificar Deployment

Después de desplegar, verifica:
- [ ] Página home carga: `https://tudominio.com/`
- [ ] Blog page carga: `https://tudominio.com/blog`
- [ ] Posts individuales cargan: `https://tudominio.com/blog/lo-que-no-se-ve-decide-todo`
- [ ] API responde: `https://tudominio.com/api/posts`
- [ ] Las imágenes se cargan correctamente
- [ ] Los colores are (amber) se ven bien

---

## 📦 Archivos Excluidos (No subir)

- `.git/` - Control de versiones
- `.env.local` - Variables locales
- `*.log` - Archivos de log
- `.next/` en la rama si usas Static Export

---

## ⚙️ Configuración Recomendada en Hostinger

1. **Cache:**
   - Habilita cache estático para `.next/static/`
   - TTL: 1 día (86400 segundos)

2. **Compression:**
   - Activa GZIP/Brotli en servidor

3. **SSL:**
   - Habilita certificado SSL/HTTPS

4. **Logs:**
   - Monitorea los logs de la aplicación en el panel

---

## 🔧 Troubleshooting

### La app no inicia
- Verifica Node.js version (debe ser 18+)
- Revisa logs en Hostinger
- Asegúrate que package.json tiene scripts: `start` y `build`

### Imágenes no cargan
- Verifica permisos de carpeta `public/`
- USA rutas relativas comenzando con `/`

### Posts no aparecen
- Verifica que los archivos `.md` están en `posts/`
- Chequea permisos de lectura en la carpeta

### Errores 404
- Verifica que el DNS apunta correctamente
- Espera 24-48 horas para propagación DNS

---

## 💡 Comando Rápido para Local Testing

Antes de desplegar, prueba localmente:
```bash
npm run build
npm start
# Visita: http://localhost:3000
```

---

## 📞 Soporte

Para soporte de Hostinger, contacta:
- Chat en vivo en el panel de control
- Email: support@hostinger.com

Para soporte de Next.js:
- Documentación: https://nextjs.org/docs
- Discord: https://discord.gg/nextjs
