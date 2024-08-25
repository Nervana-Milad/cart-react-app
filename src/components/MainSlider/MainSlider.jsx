import { useEffect, useState } from "react";
import classes from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../assets/images/grocery-banner-2.jpeg";
import img2 from "../../assets/images/grocery-banner.png";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";

function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const images = [
    {
      src: slider1,
      label: "image 1",
    },
    {
      src: slider2,
      label: "image 2",
    },
    {
      src: slider3,
      label: "image 3",
    },
  ];

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    className="w-full h-[400px] object-cover"
                    src={image.src}
                    alt={image.label}
                  />
                ))}
              </Slider>
            </div>
            <div className="lg:w-1/3 flex flex-col">
              <img
                className="w-full h-[200px] object-cover"
                src={img1}
                alt=""
              />
              <img
                className="w-full h-[200px] object-cover"
                src={img2}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainSlider;
