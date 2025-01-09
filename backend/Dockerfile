# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los certificados SSL al contenedor
COPY key.pem cert.pem ./

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Expon el puerto en el que tu aplicación se ejecuta (ajústalo según sea necesario)
EXPOSE 8080
EXPOSE 3001

# Define el comando de inicio para tu aplicación
CMD ["node", "serverhttps.js"]
