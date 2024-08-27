import { useFormik } from "formik";
// import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

function Checkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  const { getPayment, cartId, removeAllProducts } = useContext(CartContext);
  const [isOnline, setIsOnline] = useState(false);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/i)
      .required("Ex: 01211111111"),
    city: Yup.string().required("Ex:(cairo)"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleCheckout,
  });

  async function handleCheckout(values) {
    setIsLoading(true);
    console.log("Submit");
    const url = isOnline
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://cart-react-application.netlify.app/`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    const res = await getPayment(url, values);
    if (res.status == "success") {
      if (isOnline) {
        window.location.href = res.session.url;
        navigate("/cart");
      } else {
        toast.success("Payment done successfully");
        // navigate("/allorders");
      }
      removeAllProducts();
    } else {
      toast.error("Something went wrong!");
      console.log(error);
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Checkout
          </h1>
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address Details
              </label>
              <input
                type="text"
                name="details"
                id="details"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter your address details..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
              />
              {formik.errors.details && formik.touched.details && (
                <span className="text-red-600 text-sm">
                  {formik.errors.details}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter your city..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
              />
              {formik.errors.city && formik.touched.city && (
                <span className="text-red-600 text-sm">
                  {formik.errors.city}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter your phone number..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone && (
                <span className="text-red-600 text-sm">
                  {formik.errors.phone}
                </span>
              )}
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="iOnline"
                id="iOnline"
                className="mr-2"
                onChange={() => setIsOnline(!isOnline)}
              />
              <label htmlFor="iOnline" className="text-sm text-gray-700">
                Pay Online
              </label>
            </div>

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : isOnline ? (
                "Pay Online"
              ) : (
                "Pay Cash"
              )}
            </button>
          </form>
        </div>
      </section>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Checkout;
