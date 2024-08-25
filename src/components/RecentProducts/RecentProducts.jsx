// import { useEffect, useState } from "react";
// import classes from "./RecentProducts.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";
import { useQuery } from "@tanstack/react-query";
function RecentProducts() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["RecentProducts"],
    queryFn: () => getRecentProducts(),
  });
  // console.log("RecentProducts: ", data);

  async function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto">
          <div className="text-center py-6 mb-5">
            <span className="text-4xl border-b-2 border-green-500">
              Products
            </span>
          </div>

          {isLoading ? (
            <Loader></Loader>
          ) : isError ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="row">
              {data?.data.data.map((product) => (
                <Product key={product.id} product={product}></Product>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default RecentProducts;
