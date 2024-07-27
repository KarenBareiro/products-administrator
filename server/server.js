const express = require('express');
const cors = require ('cors') //para realizar solictudes de origen cruzado
// const connectDB = require('./servidor/configuración/mongoose.config'); // Importamos la función de configuración de Mongoose
const RouterProducts = require('./router/routerProductsAdm'); // Importamos las rutas de chistes

const app = express(); // Creamos una instancia de la aplicación Express

require ('./settings/database'); // conectamos a la base de datos


// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use (express.urlencoded({extended:true}));
app.use (cors());

// Middleware para manejar las rutas de chistes
app.use('/', RouterProducts);

// Iniciamos el servidor y escuchamos en el puerto especificado
app.listen(8080, () => {
  console.log('Servidor corriendo en el puerto 8080'); // Mensaje de éxito cuando el servidor se inicia correctamente
});