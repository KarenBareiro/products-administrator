const mongoose = require('mongoose');

// Definimos el esquema de datos para los chistes
const ProductSchema =  mongoose.Schema({
  product: {
    type: String,
    required: [true, "Please, insert the name of the product"],
    minLength:[3, "Please insert a text with more than 3 letters"]
  },
  price: {
    type: Number,
    required: [true, "Please, insert the price of product"],
  },
  description: {
    type: String,
    required: [true, "Please, insert the description of the product"],
    minLength:[10,"Please insert a text with more than 10 letters"],
  },
});

const Product = mongoose.model ('product',ProductSchema); //creamos el modelo de productos en la base de datos

module.exports = Product;