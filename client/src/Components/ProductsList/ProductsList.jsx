import { Link } from "react-router-dom";

const ProductsList = ({ productsList }) => {

  
    return (
      <div>
         <h2>All Products</h2>
        <ul>
          {productsList.map((product, index) => { 
            return (<li key={index}>
              <Link to={`/details/product/${product._id}`}> {/*linkeamos el ID del producto a la URL de details product */}
                  <h3>   {product.product}</h3>
              </Link>
            </li>)
            
})}
        </ul>
      </div>
    );
  }
  
  export default ProductsList;