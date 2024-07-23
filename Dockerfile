# Usar la imagen base de Node.js v22.5.1 para construir la aplicación Angular
FROM node:22.5.1 AS build-step

# Crear el directorio de trabajo en el contenedor
RUN mkdir -p /app
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package.json /app
COPY package-lock.json /app

# Instalar las dependencias de la aplicación
RUN npm install

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar el resto de la aplicación al contenedor
COPY . /app

# Construir la aplicación Angular
RUN ng build --configuration=production

# Usar una versión específica de Nginx para servir la aplicación
FROM nginx:1.17.1-alpine

# Copiar los archivos construidos desde la etapa de construcción a la carpeta de Nginx
COPY --from=build-step /app/dist/product-front/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
