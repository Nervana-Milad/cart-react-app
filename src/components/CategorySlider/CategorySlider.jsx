import { useEffect, useState } from "react";
import classes from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import Loader from "../Loader/Loader";

function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200, // For large desktops
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024, // For tablets in landscape mode
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // For tablets in portrait mode
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function getCategories(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`,
        values
      );
      setCategories(data.data);
      // console.log(data.data);
      setError(null);
    } catch (error) {
      // console.log(error);
      setError(error.response.data.message);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-7 ">
            <span className="text-4xl border-b-2 border-green-500">
              Category Slider
            </span>
          </div>
          {isLoading ? (
            <Loader></Loader>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : (
            <Slider {...settings} className="">
              {categories.map((category, id) => (
                <div className="w-full text-center" key={id}>
                  <img
                    className={`mb-2 ${classes.CategoryImage}`}
                    src={category.image}
                    alt={category.name}
                  />
                  <h2 className="text-sm md:text-base">{category.name}</h2>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
