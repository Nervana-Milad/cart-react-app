import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { WishContext } from "../../Context/WishContext";
import { Helmet } from "react-helmet";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlistDetails } =
    useContext(WishContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const toCartDetails = useRef();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["ProductsDetails", id],
    queryFn: () => getProductsDetails(),
  });

  async function getProductsDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  // Check if the product is already in the wishlist
  useEffect(() => {
    if (wishlistDetails?.some((item) => item.id === data?.data?.data.id)) {
      setIsInWishlist(true);
    }
  }, [wishlistDetails, data]);

  async function handleWishlistToggle(productId) {
    if (isInWishlist) {
      const res = await removeFromWishlist(productId);
      if (res.status === "success") {
        setIsInWishlist(false);
        toast.success(res.message);
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      const res = await addToWishlist(productId);
      if (res.status === "success") {
        setIsInWishlist(true);
        toast.success(res.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  async function addProductToCart(productId) {
    const res = await addToCart(productId);
    if (res.status === "success") {
      toast.success(res.message);
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <>
      {/* <section className="py-20">
        <div className="container mx-auto">
          {isLoading ? (
            <Loader></Loader>
          ) : isError ? (
            <div className="alert alert-error">{error.message}</div>
          ) : (
            data && (
              <div className="row items-center" ref={toCartDetails}>
                <div className="w-1/3 px-4">
                  <Slider {...settings}>
                    {data.data.data?.images?.map((src, index) => (
                      <img key={index} src={src} alt={data.data.data.title} />
                    ))}
                  </Slider>
                </div>
                <div className="w-2/3 px-4">
                  <h1 className="text-2xl mb-2">{data.data.data.title}</h1>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{data.data.data.title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                    <meta name="keywords" content={data.data.data.slug} />
                  </Helmet>
                  <p className="text-gray-600 mb-2">
                    {data.data.data.description}
                  </p>
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3>{data.data.data?.category?.name}</h3>
                      <span>{data.data.data.price} EGP</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-300"></i>
                      <span>{data.data.data.ratingsAverage}</span>
                    </div>
                  </div>
                  <i
                    role="button"
                    onClick={() => handleWishlistToggle(data.data.data.id)}
                    className={`fa-heart py-5 text-2xl ${
                      isInWishlist ? "text-green-500 fas" : "text-black far"
                    } cursor-pointer`}
                  ></i>
                  <button
                    onClick={() => addProductToCart(data.data.data.id)}
                    className="btn btn-green w-full"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section> */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="alert alert-error">{error.message}</div>
          ) : (
            data && (
              <div
                className="flex flex-col md:flex-row items-center"
                ref={toCartDetails}
              >
                <div className="w-full md:w-1/3 px-2 md:px-4 mb-6 md:mb-0">
                  <Slider {...settings}>
                    {data.data.data?.images?.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={data.data.data.title}
                        className="w-full h-auto"
                      />
                    ))}
                  </Slider>
                </div>
                <div className="w-full md:w-2/3 px-2 md:px-4">
                  <h1 className="text-xl md:text-2xl mb-2">
                    {data.data.data.title}
                  </h1>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{data.data.data.title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                    <meta name="keywords" content={data.data.data.slug} />
                  </Helmet>
                  <p className="text-gray-600 mb-2">
                    {data.data.data.description}
                  </p>
                  <div className="flex flex-col md:flex-row md:justify-between mb-2">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-lg font-semibold">
                        {data.data.data?.category?.name}
                      </h3>
                      <span className="text-lg font-semibold">
                        {data.data.data.price} EGP
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-300 mr-2"></i>
                      <span>{data.data.data.ratingsAverage}</span>
                    </div>
                  </div>
                  <i
                    role="button"
                    onClick={() => handleWishlistToggle(data.data.data.id)}
                    className={`fa-heart py-5 text-2xl ${
                      isInWishlist ? "text-green-500 fas" : "text-black far"
                    } cursor-pointer`}
                  ></i>
                  <button
                    onClick={() => addProductToCart(data.data.data.id)}
                    className="btn btn-green w-full mt-4"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <RelatedProducts></RelatedProducts>
    </>
  );
}

export default ProductDetails;
