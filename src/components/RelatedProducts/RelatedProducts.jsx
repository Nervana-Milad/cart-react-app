import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";

function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();
  const toCartDetails = useRef();

  async function getRecentProducts(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
        values
      );
      const res = data.data.filter(
        (product) => product.category.name == category
      );
      setProducts(res);

      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleToCartDetails() {
    console.log("sCrooool");
    toCartDetails.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    getRecentProducts();
  }, []);
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center py-6">
            <span className="text-4xl border-b-2 border-green-500">
              Related Products
            </span>
          </div>
          {isLoading ? (
            <Loader></Loader>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <Product
                  onClick={handleToCartDetails}
                  key={product.id}
                  product={product}
                ></Product>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RelatedProducts;
