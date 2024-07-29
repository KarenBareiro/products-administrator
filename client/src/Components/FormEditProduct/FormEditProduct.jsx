import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const FormEditProduct = (props) => {
  // Estado para almacenar el producto actual y los detalles de la actualización
  const [updateDetails, setUpdateDetails] = useState({
    product: "",
    price: "",
    description: "",
  });
  const [actualProduct, setActualProduct] = useState(null);
  const [error, setError] = useState("");
  const params = useParams(); //usamos useParams para obtener el dato que recibimos en la URL (ID) para buscar el producto actual
  const navigate = useNavigate();

  // useEffect para encontrar el producto actual basado en el parámetro de la URL
  useEffect(() => {
    const product = props.productsList.find(
      (product) => product._id === params._id
    );
    // Si el producto existe, actualiza el estado con los detalles del producto
    if (product) {
      setActualProduct(product);
      setUpdateDetails({
        product: product.product,
        price: product.price,
        description: product.description,
      });
    }
  }, [params._id, props.productsList]); // Dependencias: el efecto se ejecuta cuando cambian el ID o la lista de productos

  if (!actualProduct) {
    return <p>Product not found</p>;
  }

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setUpdateDetails({
      ...updateDetails, // Copia los detalles actuales
      [name]: value, // Actualiza el campo correspondiente
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    // Lógica para actualizar el producto
    console.log("Updated product details:", updateDetails);
    // Aquí deberías realizar la actualización del producto en el backend o en el estado
    try {
      const URL = `http://localhost:8080/products/edit/${actualProduct._id}`;
    const response = await axios.put(URL, updateDetails);
    
    if (response.status === 200) {
        navigate(`/${params._id}`); // Redirige a la página de detalles del producto solo si fue exitosa
      }
    } catch (error) {
     // Manejo de errores
     console.error("Algo falló:", error); // Muestra el error en la consola
     setError(error.response ? error.response.statusText : "Error al actualizar el producto");
    }
  };

  return (
    <>
      <h1>Product: {actualProduct.product}</h1> {/* nombre del producto*/}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="product"
            value={updateDetails.product}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={updateDetails.price}
            onChange={handleChange}
          />
          {/*  precio del producto */}
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={updateDetails.description}
            onChange={handleChange}
          />
          {/*  descripcion del producto del producto */}
        </div>
        <button>Update</button>
      </form>
      <div>
        <p>{error}</p>
      </div>
    </>
  );
};

export default FormEditProduct;
