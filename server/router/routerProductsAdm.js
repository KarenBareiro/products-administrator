const express = require ('express');


const controllersProductsAdm = require ('../controllers/controllersProductsAdm')

const routerProductsAdm = express.Router(); //utilizamos de express un objeto que se llama router


routerProductsAdm.get ('/products', controllersProductsAdm.getAllProducts ); //definimos la ruta con dos parametros, el primer parametro indicamos la ruta y obtenemos todos los productos a  traves del metodo get
routerProductsAdm.get ('/products/:id', controllersProductsAdm.getProductById); //Obtenemos un chiste ppor su ID a  traves del metodo get
routerProductsAdm.post('/products/create', controllersProductsAdm.createProduct); // creamos un nuevo chiste con el metodo post
routerProductsAdm.put('/products/edit/:id', controllersProductsAdm.editProduct); // actualizamos un producto  por su ID con el metodo put
routerProductsAdm.delete('/products/delete/:id', controllersProductsAdm.deleteProduct); // Eliminamos un chiste por su ID con el metodo delete

module.exports = routerProductsAdm; // Exportamos el enrutador configurado