# backend-node-js-api-crud
Curso Codo A Codo - JS Backend 2024 - 1er Cuatrimestre - API CRUD con NodeJS

## Configurar el Entorno de Desarrollo

### 1. Crear el directorio

### 2. Crear el archivo index.js
```
touch index.js
```

### 3. Crear el archivo package.json con NPM
```
npm init -y
```

### 4. Instalar Express.js
```
npm install express
```
Después de instalar Express, al archivo **package.json** incluir **"type": "module"**, lo que indica que el proyecto utilizará la sintaxis de modulos ES6 (import/export).

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
* Importamos `express` del modulo Express que instalamos.
* Express viene con `bodyParser`, y nos permite recibir el cuerpo de la petición POST. 
* Crearmos una `app` usando el objeto `express`.
* Especificamos el puerto para la aplicación `PORT` (5000).
* Especificamos que se utilizarán datos JSON en la aplicación.
* Utilizamos el método `listen` en la aplicación creada `app` para escuchar las peticiones entrantes.

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

## Crear Una Ruta de la API
Se pueden definir las rutas de una API usando los métodos `app.get()`, `app.post()`, `app.put()` y `app.delete()`.
```
app.get("/", (req, res) => {
  console.log("[GET ROUTE]");
  res.send("HELLO FROM HOMEPAGE");
});
```
La función `app.get()` acepta dos parámetros. El primero se usa para especificar la ruta (ej: "/").
El segundo es una función de callback donde se define que hacer cuando se recibe una petición GET. La función de callback recibe dos parámetros: el cuerpo de la petición (`req`), que contiene información como la consulta de la peteción, los parámetros, el cuerpo y los encabezados HTTP. Mientras que el objeto respuesta (`res`) contiene la información que se desea enviar.

## Crear la API CRUD de Users
Estos son los endpoint de la API:
1. GET /users - buscar todos los usuario
2. POST /users - crear un usuario
3. GET /users/:id - buscar un usuario especifico
4. DELETE /users/:id - borrar un usuario especifico
5. PATCH /users/:id - actualizar un usuario especifico

## Crear el Endpoint GET /users
Se obtendrá la lista de todos los usuarios en su base de datos simulada. Esta información se presentará en formato JSON.
* Creamos una nueva carpeta llamada "routes".
* Creamos un nuevo archivo llamado `usuarios.js` dentro de la carpeta de "routes".
* Escribimos el código para configurar el enrutador GET.
```
import express from 'express';
const router = express.Router();

// Mock database
const users = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
  },
  {
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@example.com",
  },
];

// Getting the list of users from the mock database
router.get("/", (req, res) => {
  res.send(users);
});

export default router
```
En el archivo **index.js** importar las rutas del archivo **users.js**:
```
import userRoutes from "./routes/users.js";
```
Usar el método `app.use`, y especificar la ruta y el controlador del enrutador:
```
app.use("/users", userRoutes);
```

## Crear el Endpoint POST /users
Permite agregar datos utilizando la petición POST. Acepta datos enviados por el cliente y los almacena en la base de datos simulada. Definimos la ruta que acepte la petición POST.
Previamente, instala el paquete UUID con el comando:
```
npm install uuid
```
Este paquete genera un ID único para cada usuario que se crea. Esto será útil cuando implementemos las peticiónes GET, DELETE y PATCH de un usuario mediante ID.
```
import { v4 as uuidv4 } from "uuid";
```
Implementamos el código para las peticiones POST.
```
router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`${user.first_name} has been added to the Database`);
});
```
* La función `router.post()` configura una ruta que responde a las peticiones HTTP POST. Esto significa que cuando un cliente envía una petición POST a la URL configurada, se activará esta ruta.
* Dentro de la función callback `(req, res) => {... }` estamos interesados ​​en la propiedad `req.body`. Esta propiedad contiene los datos (nombre, apellido y correo electrónico) que el cliente enviará como parte del cuerpo de la solicitud POST.
* Con const `user = req.body` extraemos estos datos de `req.body` y los almacenamos en la constante de `user`.
* Agregamos los datos del `user` a una matriz llamada `users`. Para garantizar que cada usuario tenga un identificador único, generamos un identificador único universal (UUID) usando una función como `uuidv4()` y lo incluimos como identificación en el objeto de usuario.
* Finalmente, usamos `res.send()` para enviar una respuesta al cliente. En este caso, enviamos un mensaje simple notificando al cliente que el usuario se agregó exitosamente a la base de datos.

## Crear el Endpoint GET /users/:id

Permite obtener datos específicos basados ​​en un ID, como una identificación de usuario.
```
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  res.send(foundUser);

  console.log("GET /users/:id", foundUser);
});
```
* La función `router.get()` configura una ruta que responde a las solicitudes HTTP GET ('/users/:id'). La parte :id es un parámetro de ruta, que nos permite capturar un valor dinámico de la URL. En este caso, representa la identificación de usuario que queremos recuperar.
* Dentro de la función de callback `(req, res) => {...}`, podemos acceder al objeto `req`, que representa la solicitud entrante realizada por el cliente. Específicamente, estamos interesados ​​en `req.params`, que contiene los valores de los parámetros de ruta. En este caso, desestructuramos la identificación de `req.params`, extrayendo efectivamente la identificación del usuario de la URL. Por ejemplo, si un cliente realiza una solicitud GET a /users/123, la identificación será '123'.
* Usamos el método `.find()` para buscar estos datos en función del ID de usuario (id) capturado de la URL. Este método intenta encontrar un usuario cuya identificación coincida con la identificación proporcionada.
* Una vez que localizamos los datos del usuario (si existen), los enviamos como respuesta usando `res.send(foundUser)`. La variable `foundUser` contiene el objeto de usuario que coincide con el ID solicitado.

## Crear el Endpoint DELETE /users/:id 
En ocasiones, es necesario eliminar cuentas de usuario o registros específicos de una base de datos por diversos motivos, como la desactivación de cuentas.
Aquí, explorará cómo utilizar este punto final para eliminar datos de usuario en función de una identificación de usuario proporcionada. 
Para eliminar datos, definiremos una ruta que acepte solicitudes DELETE y elimine los datos de la base de datos.
Vea el código para eliminar un usuario de una base de datos a continuación:
```
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /:${id}`, "id.toString(): ", id.toString());

  const newUsers = users.filter((user) => user.id !== id.toString());

  console.log(newUsers);

  res.send(`${id} eliminado exitosamente de la base de datos`);
});
```
Esto es lo que hace este código:
* La función `router.delete()` configura una ruta que responde a las solicitudes HTTP DELETE. En este ejemplo, hemos definido una ruta con ('/:id'), donde :id es un parámetro de ruta. Captura un valor dinámico de la URL, que representa la ID de usuario que queremos eliminar.
* En la función de devolución de llamada `(req, res) => {...}`, podemos acceder al objeto `req`, que representa la solicitud entrante realizada por el cliente. Específicamente, estamos interesados ​​en `req.params`, que contiene los valores de los parámetros de ruta. Aquí, desestructuramos la identificación de `req.params`, extrayendo la identificación del usuario de la URL. Por ejemplo, si un cliente envía una solicitud DELETE a /users/123, la identificación será '123'.
* Suponiendo que tenemos una matriz o base de datos (usuarios) que contiene datos de usuario, empleamos el método `.filter()` para crear una nueva matriz que excluye al usuario con el ID coincidente (id). Esto elimina efectivamente al usuario del almacén de datos.
* Después de eliminar exitosamente al usuario, enviamos una respuesta al cliente usando `res.send()`. La respuesta contiene un mensaje que confirma la eliminación, incluido el ID del usuario que se eliminó de la base de datos.


## Implementar Swagger
https://www.youtube.com/watch?v=rIWGcxnVIA8

