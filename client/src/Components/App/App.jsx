import { useEffect, useState } from "react";
import "./App.css";
import FormProduct from "../FormProduct/FormProduct";
import ProductsList from "../ProductsList/ProductsList";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import FormEditProduct from "../FormEditProduct/FormEditProduct";

function App() {
  const [productsList, setProductsList] = useState([]);

  // Función para actualizar la lista de productos después de agregar uno nuevo
  const updateProductList = (newProduct) => {
    setProductsList([...productsList, newProduct]);
  };

  //Funcion para eliminar el producto de la lista
  const removeProductFromList = (_id) => {
    const updatedList = productsList.filter((product) => product._id !== _id);
    setProductsList(updatedList);
  };

  // Función para actualizar un producto en la lista de productos
  const updateProductInList = (updatedProduct) => {
    const updatedList = productsList.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setProductsList(updatedList);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const URL = "http://localhost:8080/products";
      const response = await axios.get(URL);
      setProductsList(response.data);
    };

    getAllProducts(); //llamammos a la funcion creada para que se active para hacer uso del use effect
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FormProduct updateProductList={updateProductList} />
              <ProductsList
                productsList={productsList}
                removeProductFromList={removeProductFromList}
              />
            </>
          }
        />
        <Route
          path="/:_id"
          element={
            <ProductDetails
              productsList={productsList}
              removeProductFromList={removeProductFromList}
            />
          }
        />
        <Route
          path="/:_id/edit"
          element={
            <FormEditProduct
              productsList={productsList}
              updateProductInList={updateProductInList}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
