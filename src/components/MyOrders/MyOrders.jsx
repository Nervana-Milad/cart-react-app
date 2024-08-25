import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

function MyOrders() {
  const { userId, removeAllProducts } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order details

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["MyOrders", userId],
    queryFn: async () => {
      if (userId) {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        );
        console.log("jjjjjjo", response.data);
        return response.data;
      }
      return [];
    },
    enabled: !!userId,
  });

  const orders = data || [];

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    removeAllProducts();
  }, []);

  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="text-center py-6 mb-5">
            <span className="text-4xl border-b-2 border-green-500">
              All Orders
            </span>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div className="alert alert-error">{error.message}</div>
          ) : orders.length === 0 ? (
            <div className="text-center">No orders found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border product p-4 rounded-lg shadow-sm"
                >
                  <div className="items-center">
                    <h3 className="text-md font-semibold mb-2">
                      Order Date: {new Date(order.createdAt).toLocaleString()}
                    </h3>
                    <p className="text-lg">
                      Total Price:
                      <span className="text-lime-600">
                        ${order.totalOrderPrice}
                      </span>
                    </p>
                  </div>
                  <p className="text-lg">
                    Number of products: {order.cartItems.length}
                  </p>

                  <button
                    onClick={() => handleOpenModal(order)}
                    className="block w-full text-center btn-green px-4 py-2 my-4 rounded"
                    type="button"
                  >
                    View Order Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Orders</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
        >
          <div className="relative p-4 w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow overflow-y-auto max-h-[80vh]">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Order Items
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
              <div className="p-4 space-y-4">
                {selectedOrder.cartItems.map((item) => (
                  <div className="border product p-4 rounded-lg" key={item._id}>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-32 h-32 object-cover rounded mb-4 md:mb-0"
                      />
                      <div className="text-center md:text-left md:ml-4">
                        <p>Items: {item.count}</p>
                        <p>Price: ${item.price}</p>
                        <h4 className="text-lg font-semibold mt-2">
                          Total Price: ${item.count * item.price}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
                <button
                  onClick={handleCloseModal}
                  className="btn-green focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrders;
