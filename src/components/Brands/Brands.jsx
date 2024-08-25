// import { useEffect, useState } from "react";
// import classes from "./Brands.module.css";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import Loader from "../Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";

function Brands() {
  const { data, isError, error, isLoading } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/brands`,
    "Brands"
  );
  const brands = data?.data?.data;
  return (
    <>
      <section className="py-6">
        <div className="container mx-auto">
          <div className="text-center py-6 mb-5">
            <span className="text-4xl border-b-2 border-green-500">Brands</span>
          </div>{" "}
          {isLoading ? (
            <Loader></Loader>
          ) : isError ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.map((brand) => (
                <div key={brand._id} className="text-center border product p-3">
                  <img
                    src={brand.image}
                    alt={brand.slug}
                    className="w-full h-auto mb-2 object-contain"
                  />
                  <h3 className="text-sm font-medium text-green-500">
                    {brand.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Brands;
