import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = (props) => {
    const params = useParams(); //usamos useParams para obtener el dato que recibimos en la URL (ID) para buscar el producto actual 
    const navigate = useNavigate();

    // Encuentra el producto actual en la lista de productos
    const actualProduct = props.productsList.find((product) => product._id === params._id);

    // Si no se encuentra el producto, muestra un mensaje
    if (!actualProduct){
        return <p>Product not found</p>
    }

     // Función para volver a la lista de productos
    const returnToAllProducts = () =>{
        navigate("/")
    }

       // Función para eliminar el producto
    const removeProduct = async() => {
        const URL = `http://localhost:8080/products/delete/${actualProduct._id}`;
        await axios.delete(URL);
        props.removeProductFromList(actualProduct._id);
        navigate("/");
    }


    return(
        <>
        <h1>Product: {actualProduct.product}</h1> {/* nombre del producto*/}
        <p>Price: {actualProduct.price}</p> {/*  precio del producto */}
        <p>Description:{actualProduct.description}</p> {/*  descripcion del producto del producto */}
        <button onClick={returnToAllProducts}>Back to All products</button>
        <button onClick ={removeProduct}>Delete</button>
        </>
    )
}

export default ProductDetails;