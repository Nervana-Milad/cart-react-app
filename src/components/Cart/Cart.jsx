import { useContext, useEffect, useState } from "react";
// import classes from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/emptycart.gif";
import { Helmet } from "react-helmet";

function Cart() {
  const {
    getCart,
    cartDetails,
    setCartDetails,
    numOfCartItems,
    removeFromCart,
    updateQuantity,
    removeAllProducts,
  } = useContext(CartContext);
  const { accessToken } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCartDetails() {
    const res = await getCart();
    if (res.status === "success") {
      setCartDetails(res.data);
    } else {
      console.log(error);
    }
  }

  async function removeProductFromCart(productId) {
    const res = await removeFromCart(productId);
    if (res.status === "success") {
      toast.success("Product removed successfully");
    } else {
      toast.error("Something went wrong!");
    }
  }

  async function removeAllProductsFromCart() {
    const res = await removeAllProducts();
    if (res.status === "success") {
      toast.success("Products removed successfully");
    } else {
      toast.error("Something went wrong!");
    }
  }

  async function updateProductQuantity(productId, count) {
    if (count === 0) {
      const res = await removeProductFromCart(productId);
      if (res.status === "success") {
        toast.success("Product removed");
      } else {
        toast.error("Something went wrong!");
      }
    } else {
      const res = await updateQuantity(productId, count);
      if (res.status === "success") {
        // console.log(res);
        toast.success("Product quantity updated successfully");
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  useEffect(() => {
    accessToken && getCartDetails();
  }, [accessToken]);

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto">
          <div className="text-center py-6 mb-5">
            <span className="text-4xl border-b-2 border-green-500">
              Shopping Cart
            </span>
          </div>{" "}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : numOfCartItems > 0 ? (
            <>
              <div className="flex flex-col md:flex-row justify-between py-4">
                <h4 className="text-2xl md:text-3xl mb-2 md:mb-0">
                  Total Items: <span>{numOfCartItems}</span>
                </h4>
                <h4 className="text-2xl md:text-3xl">
                  Total Price: <span>{cartDetails.totalCartPrice} EGP</span>
                </h4>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails?.products?.map((product) => (
                      <tr
                        key={product.product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={product.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updateProductQuantity(
                                  product.product.id,
                                  product.count - 1
                                )
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-black bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-green-300 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Decrease quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>{product.count}</div>
                            <button
                              onClick={() =>
                                updateProductQuantity(
                                  product.product.id,
                                  product.count + 1
                                )
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-black bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-green-500 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                              type="button"
                            >
                              <span className="sr-only">Increase quantity</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              removeProductFromCart(product.product.id)
                            }
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => removeAllProductsFromCart()}
                  className="mt-10 btn font-medium bg-red-600 text-white dark:text-red-500 hover:bg-red-700"
                >
                  Clear all Items
                </button>
              </div>
              <div className="flex justify-end">
                <Link
                  to="/products"
                  className="btn btn-green mt-6 inline-block"
                >
                  Continue Shopping
                </Link>
              </div>
              <Link
                to={"/checkout"}
                className="btn btn-green block w-full my-10 text-center"
              >
                Checkout
              </Link>
            </>
          ) : (
            <div className="flex items-center flex-col text-center">
              <img src={emptyCart} className="w-[25%]" alt="Empty Cart" />
              <h2 className="text-2xl font-semibold">Your cart is empty</h2>
              <Link to="/products" className="btn btn-green mt-6 inline-block">
                Go Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Cart;
