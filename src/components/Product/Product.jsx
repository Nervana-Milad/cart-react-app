import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { WishContext } from "../../Context/WishContext";

function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const {
    addToWishlist,
    removeFromWishlist,
    wishlistDetails,
    setWishlistCount,
  } = useContext(WishContext);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (wishlistDetails?.some((item) => item.id === product.id)) {
      setIsInWishlist(true);
    }
  }, [wishlistDetails, product.id]);

  async function handleWishlistToggle(productId) {
    if (isInWishlist) {
      const res = await removeFromWishlist(productId);
      if (res.status === "success") {
        setIsInWishlist(false);
        // setWishlistCount(res.count);
        toast.success(res.message);
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      const res = await addToWishlist(productId);
      if (res.status === "success") {
        setIsInWishlist(true);
        // setWishlistCount(res.count);
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
    <div className="w-full p-4 sm:w-1/2 sm:p-5 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 product">
      <Link
        to={`/product-details/${product.id}/${product.category.name}`}
        className="block"
      >
        <img
          className="mb-2 w-full h-auto object-cover"
          src={product.imageCover}
          alt={product.title}
        />
        <span className="block mb-2 text-[#92cf37]">
          {product.category.name}
        </span>
        <h2 className="text-lg font-medium truncate mb-2">{product.title}</h2>
        <div className="flex justify-between items-center text-gray-600">
          <span>{product.price} EGP</span>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-300 mr-1"></i>
            <span>{product.ratingsAverage}</span>
          </div>
        </div>
      </Link>
      <div className="text-center">
        <i
          role="button"
          onClick={() => handleWishlistToggle(product.id)}
          className={`fa-heart ${
            isInWishlist ? "text-green-500 fas" : "text-black far"
          } cursor-pointer`}
        ></i>
        <button
          onClick={() => addProductToCart(product.id)}
          className="btn btn-green w-full mx-auto p-4 m-4"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
