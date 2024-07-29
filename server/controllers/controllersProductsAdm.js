

const Product = require ('../models/modelsProductsAdm');

//Funcion para crear productos en la base de datos

module.exports.createProduct = async (req, res) =>{
    const product = new Product ({
        product: req.body.title,
        price: req.body.price,
        description: req.body.description,
    });
    try{
        const newProduct = await product.save();
        res.status(201).json(newProduct);
        
    }
    catch (error){
res.status (400).json ({message: error.message});

    }
};





// Función para obtener todos los productos
module.exports.getAllProducts = async (req, res) => {
    try {
      const productsList = await Product.find(); // Consultamos todos los productos en la base de datos
      res.json(productsList); // Devolvemos los productos como respuesta en formato JSON
    } catch (error) {
      res.status(500).json({ message: error.message }); // Manejamos errores y devolvemos un mensaje de error
    }
  };

module.exports.getProductById = async (req, res) =>{
  try {
    const product = await Product.findById(req.params.id); // Consultamos un chiste por su ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Si no se encuentra el chiste, devolvemos un mensaje de error
    }
    res.json(product); // Devolvemos el chiste encontrado como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejamos errores y devolvemos un mensaje de error
  }
};



module.exports.editProduct = (req,res) =>{
  const fieldsToUpdate = {};
  const {product, price, description} = req.body;

  if (product){
    fieldsToUpdate.product = product;
  }

  if (price) {
    fieldsToUpdate.price = price;
  }

  if (description){
    fieldsToUpdate.description = description;
  }
  Product.findOneAndUpdate({_id: req.params.id},fieldsToUpdate, {new:true})
  .then((productUpdated) =>{
    if (!productUpdated) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productUpdated);
  })
  .catch((error) => {
    console.error("Update failed:", error); // Log de errores del servidor
    return res.status(400).json(error);
  });
};

module.exports.deleteProduct = (req,res) =>{
  Product.findOneAndDelete({_id: req.params.id})
  .then(() => {
    return res.status(204).end();
  })
  .catch((error) => {

    return res.status(400).json(error);
  })
}



