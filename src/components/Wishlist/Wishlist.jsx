import { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishContext";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import wishlistImg from "../../assets/wishlist.png"; // Adjust the path as needed

function Wishlist() {
  const {
    getWishlist,
    wishlistDetails,
    setWishlistDetails,
    removeFromWishlist,
  } = useContext(WishContext);
  const { accessToken } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function getWishlistDetails() {
    const res = await getWishlist();
    if (res.status === "success") {
      setWishlistDetails(res.data);
    } else {
      setError(res.message || "Failed to fetch wishlist");
    }
  }

  async function removeProductFromWishlist(productId) {
    const res = await removeFromWishlist(productId);
    if (res.status === "success") {
      toast.success("Product removed successfully");
      // getWishlistDetails();
    } else {
      toast.error("Something went wrong!");
    }
  }

  function handleOpenModal(item) {
    setSelectedItem(item);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedItem(null);
  }

  useEffect(() => {
    if (accessToken) getWishlistDetails();
  }, [accessToken]);

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="text-center py-6 mb-5">
            <span className="text-4xl font-semibold border-b-2 border-green-500">
              Wishlist
            </span>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : wishlistDetails.length === 0 ? (
            <div className="flex items-center flex-col text-center">
              <img src={wishlistImg} className="w-[25%]" alt="Empty Cart" />
              <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
              <Link to="/products" className="btn btn-green mt-6 inline-block">
                Show Products
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {wishlistDetails.map((item) => (
                <div key={item.id} className="product bg-white">
                  <a href="#">
                    <img
                      className="p-4 rounded-t-lg object-cover w-full h-48"
                      src={item.imageCover}
                      alt={item.name}
                    />
                  </a>
                  <div className="px-4 pb-4">
                    <a href="#">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                    </a>
                    <div className="flex items-center mt-2.5 mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < Math.round(item.ratingsAverage)
                                ? "text-yellow-300"
                                : "text-gray-200"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 22 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-3 text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {item.ratingsAverage}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${item.price}
                      </span>
                      <button
                        onClick={() => removeProductFromWishlist(item.id)}
                        className="text-white bg-green-600 hover:bg-green-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                      >
                        Remove
                      </button>
                    </div>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="block text-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm my-5 text-center hover:border-b-2"
                      type="button"
                    >
                      More Info..
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Wishlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {/* Modal */}
      {modalVisible && selectedItem && (
        <div
          id="default-modal"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedItem.title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleCloseModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="overflow-auto max-h-[70vh] p-4 md:p-5 flex flex-col md:flex-row">
              <img
                className="w-full h-48 object-cover rounded-lg md:w-1/3"
                src={selectedItem.imageCover}
                alt={selectedItem.name}
              />
              <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                <p className="pb-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.description || "No description available."}
                </p>
                <h5 className="pb-4">
                  <span className="font-bold text-green-500">Category:</span>{" "}
                  {selectedItem.category.name}
                </h5>
                <h5 className="pb-4">
                  <span className="font-bold text-green-500">Brand:</span>{" "}
                  {selectedItem.brand.name}
                </h5>
                <h5 className="pb-4">
                  <span className="font-bold text-green-500">
                    Available Quantity:
                  </span>{" "}
                  {selectedItem.quantity}
                </h5>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleCloseModal}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Wishlist;
