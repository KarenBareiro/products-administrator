import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import ProductsList from "../ProductsList/ProductsList";

const Form = ({updateProductList}) =>{

    const [title, setTitle] = useState ("");
    const [price, setPrice] = useState (0);
    const [description, setDescription] =useState("");
    const [error, setError] = useState("");

    // const navegacion = useNavigate();

    const sendFormProducts = async (e) =>{
        e.preventDefault(); //evitamos a que se recargue la pagina
        try {
            const newProduct ={
                title, price, description //guardamos todos los valores de nuestro campo de formulario en un objeto
            }
            const URL = "http://localhost:8080/products/create" //guardamos nuestra ruta de nuestro servidor
            const respuesta = await axios.post(URL, newProduct) //creamos el producto en la base de datos
            console.log("data:",respuesta.data)

            updateProductList(respuesta.data); //llamamaos a la uncion para actualizar la lista de productos
            setTitle("");
            setPrice("");
            setDescription(0);
            // setError("");
            // navegacion("/");
         
        } catch (error) {
            console.log("Ocurrió un error:", error) //imprimos en consola el error
            //actualizamos el estado de error
            setError (error.response.statusText);

        }

        //limpiamos los campos del formulario
        // setTitle("");
        // setPrice(0);
        // setDescription("");
        // setError("");
    }

    return (
        <>
        <h1>Project Manager</h1>
        <h2>Add new product</h2>
        <form onSubmit={sendFormProducts}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type ="text"
                        id = "title"
                        name = "title"
                        value = {title}
                        onChange = { (e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type = "number"
                        id = "price"
                        name = "price"
                        value ={price}
                        onChange = { (e) => setPrice(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea type ="text"
                        id = "description"
                        name = "description"
                        value ={description}
                        onChange = { (e) => setDescription(e.target.value)} />
            </div>
            <button>Create</button>
            <div><p>{error}</p></div>
        </form>
        </>
    )
}

export default Form;