import { useEffect, useState } from "react";
import classes from "./Error.module.css";
import error404 from "../../assets/error.svg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

function Error() {
  return (
    <>
      <Navbar></Navbar>
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img src={error404} alt="Error image" className="mx-auto" />
        </div>
      </section>

      <Footer></Footer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Error;
