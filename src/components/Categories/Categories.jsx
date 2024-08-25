// import { useEffect, useState } from "react";
import classes from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet";

function Categories() {
  const { data, isError, error, isLoading } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "Categories"
  );
  const categories = data?.data?.data;
  // console.log("My Categories: ", categories);
  return (
    <>
      <section className="py-6">
        <div className="container mx-auto">
          <div className="text-center py-6 mb-5">
            <span className="text-4xl border-b-2 border-green-500">
              Categories
            </span>
          </div>{" "}
          {isLoading ? (
            <Loader></Loader>
          ) : isError ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 m-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="text-center border product p-3"
                >
                  <img
                    src={category.image}
                    alt={category.slug}
                    className={`w-full mb-2 ${classes.CategoryImage}`}
                  />
                  <h3 className="text-sm font-medium text-green-500">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Categories;
