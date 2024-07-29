import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = (props) => {
  const params = useParams(); //usamos useParams para obtener el dato que recibimos en la URL (ID) para buscar el producto actual
  const navigate = useNavigate();
  const [useEffectProduct, setUseEffectProduct] = useState({
    product: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  //creamos un estado que actualize la lista de productos actual

  // useEffect para cargar el producto actual basado en el ID
  useEffect(() => {
    // Encuentra el producto actual en la lista de productos
    const actualProduct = props.productsList.find(
      (product) => product._id === params._id
    );

    if (actualProduct) {
      setUseEffectProduct({
        product: actualProduct.product,
        price: actualProduct.price,
        description: actualProduct.description,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [params._id, props.productsList]); // Dependencias: se ejecuta cuando cambia el ID o la lista de productos

  // Función para volver a la lista de productos
  const returnToAllProducts = () => {
    navigate("/");
  };

  // Función para eliminar el producto
  const removeProduct = async () => {
    try {
      const URL = `http://localhost:8080/products/delete/${params._id}`;
      await axios.delete(URL);
      props.removeProductFromList(params._id); // Usa params._id para eliminar el producto
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setError("Error al eliminar el producto");
    }
  };

  return (
    <>
      <h1>Product: {useEffectProduct.product}</h1> {/* nombre del producto*/}
      <p>Price: {useEffectProduct.price}</p> {/*  precio del producto */}
      <p>Description: {useEffectProduct.description}</p>{" "}
      {/*  descripcion del producto del producto */}
      <button onClick={returnToAllProducts}>Back to All products</button>
      <button onClick={removeProduct}>Delete</button>
      <button>
        {" "}
        <Link to={`/${params._id}/edit`}>
          {" "}
          {/*linkeamos el ID del producto a la URL de details product */}
          Update
        </Link>
      </button>
    </>
  );
};

export default ProductDetails;
