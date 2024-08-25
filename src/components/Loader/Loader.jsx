import { useEffect, useState } from "react";
import classes from "./Loader.module.css";
import "./Loader.css";

function Loader() {
  return (
    <>
      <div className="flex justify-center">
        <span className="Loader"></span>
      </div>
    </>
  );
}

export default Loader;
