# backend-node-js-api-crud
Curso Codo A Codo - JS Backend 2024 - 1er Cuatrimestre - API CRUD con NodeJS

## Configurar el Entorno de Desarrollo

### 1. Crear el directorio

### 2. Crear el archivo index.js

### 3. Crear el archivo package.json con NPM
```
npm init -y
```

### 4. Instalar Express.js
```
npm install express
```
Despues de instalar Express, al archivo **package.json** incluir **"tipo": "module"**, lo que indica que el proyecto utilizara la sintaxis de modulos ES6 (import/export).

## Configurar el Servidor para la API CRUD con Node.js y Express

### 1. Escribir la Configuración del Servidor en el archivo index.js
```
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
```

### 2. Iniciar el Servidor
```
node index.js
```

### 3. Instalar Nodemon (opcional)
```
npm install --save-dev nodemon
```
Para usar Nodemon, en el archivo **package.json** reemplazar el script de inicio por: 
```
"start": "nodemon index.js"
```
Inicia el servidor ejecutando el comando:
```
npm start
```
