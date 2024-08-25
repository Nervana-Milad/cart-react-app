import { useEffect, useState } from "react";
import classes from "./NotFound.module.css";
import notFound from "../../assets/notfound.svg";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <section className="flex items-center flex-col justify-center py-12">
        <div className="text-center">
          <img
            src={notFound}
            alt="Not found image"
            className="w-[100%] mx-auto"
          />
        </div>
        <h1 className="text-4xl text-center text-green-500">NOT FOUND!</h1>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default NotFound;
