import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <RecentProducts></RecentProducts>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Home;
