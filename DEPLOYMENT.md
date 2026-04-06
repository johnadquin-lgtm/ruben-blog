# Guía de Despliegue - Rubén Fidalgo Blog

## Despliegue en Vercel (Recomendado)

Vercel es la plataforma oficial de Next.js con despliegue automático.

### Requisitos
- Cuenta en Vercel (https://vercel.com)
- Repositorio en GitHub

### Pasos

1. **Crear Repositorio Git**
```bash
cd /home/vic/Descargas/proyectos/ruben-blog
git init
git add .
git commit -m "Proyecto Rubén Fidalgo Blog"
```

2. **Subir a GitHub**
```bash
# Crea un repositorio en https://github.com/new
# Luego ejecuta:
git remote add origin https://github.com/tuusuario/ruben-blog.git
git branch -M main
git push -u origin main
```

3. **Conectar con Vercel**
- Ve a https://vercel.com/dashboard
- Haz click en "Add New..." → "Project"
- Selecciona tu repositorio
- Vercel detectará Next.js automáticamente
- Haz click en "Deploy"

4. **Tu sitio está vivo**
- Vercel te dará una URL como: `ruben-blog-xxxxx.vercel.app`
- Cada push a main redesplegará automáticamente

### Dominio Personalizado (Vercel)

1. Ve a Project Settings → Domains
2. Click en "Add Domain"
3. Ingresa tu dominio personalizado
4. Sigue las instrucciones de DNS

## Despliegue en Netlify

### Pasos

1. **Crear archivo `netlify.toml`** en la raíz:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/"
  status = 200
```

2. **Conectar con Netlify**
- Ve a https://app.netlify.com
- Click en "Add new site" → "Import an existing project"
- Conecta tu repositorio de GitHub
- Netlify configurará automáticamente

3. **Dominio personalizado**
- Ve a Site settings → Domain management
- Click en "Add custom domain"

## Despliegue Manual (Servidor Propio)

### Requisitos
- Servidor con Node.js 18+
- PM2 o similar para mantener el proceso activo

### Pasos

1. **Compilar para Producción**
```bash
npm run build
```

2. **Instalar PM2** (gestor de procesos)
```bash
npm install -g pm2
```

3. **Iniciar con PM2**
```bash
pm2 start npm --name "ruben-blog" -- start
pm2 save
pm2 startup
```

4. **Configurar Nginx como Proxy Reverso**

Crear `/etc/nginx/sites-available/ruben-blog`:
```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Habilitar el sitio**
```bash
ln -s /etc/nginx/sites-available/ruben-blog /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## Despliegue en Docker

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Construir y ejecutar
```bash
docker build -t ruben-blog .
docker run -p 3000:3000 ruben-blog
```

## Variables de Entorno

Crear archivo `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://tudominio.com
NEXT_PUBLIC_EMAIL=contacto@tudominio.com
```

## Monitoreo y Mantenimiento

### Vercel
- Dashboard automático
- Logs en tiempo real
- Analytics incluido

### Servidor Propio
```bash
# Ver logs
pm2 logs ruben-blog

# Monitorear recursos
pm2 monit

# Reiniciar
pm2 restart ruben-blog

# Actualizar código
git pull origin main
npm run build
pm2 restart ruben-blog
```

## Optimización para Producción

1. **Análisis de tamaño**
```bash
npm install -g @next/bundle-analyzer
npm run build
```

2. **Compresión de imágenes**
- Usa WebP cuando sea posible
- Optimiza con TinyPNG o ImageOptim

3. **Cache**
- Las imágenes se cachean automáticamente
- Los posts estáticos se prerenderizan

## SSL/HTTPS

- **Vercel**: SSL automático ✓
- **Netlify**: SSL automático ✓
- **Servidor Propio**: Use Let's Encrypt con Certbot

```bash
sudo apt install certbot python3-certbot-nginx
certbot --nginx -d tudominio.com
```

## Monitoreo de Errores

### Recomendado: Sentry
1. Crea cuenta en https://sentry.io
2. Instala el SDK
3. Configura en tu aplicación
4. Recibe alertas automáticas

## Backups

Recomendaciones:
- Guarda regularmente la carpeta `posts/` en GitHub
- Las imágenes en `public/images/` también
- Configura backups automáticos del servidor

---

¿Necesitas ayuda? Consulta README.md
