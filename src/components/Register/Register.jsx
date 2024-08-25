import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

function Register() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name must be more than 3 chars")
      .max(15, "name must be less than or equal to 15 chars")
      .required("Name is required"),
    email: Yup.string().email().required(),
    phone: Yup.string()
      .matches(/^(002)?01[0125][0-9]{8}$/i)
      .required(),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9_]{7}$/i)
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });

  async function handleRegister(values) {
    setIsLoading(true);
    console.log("Submit");
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(data);
      if (data.message === "success") {
        setAccessToken(data.token);
        navigate("/login");
      }
    } catch (error) {
      setError(error.response.data.message);
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Register
          </h1>
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter your name..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <span className="text-red-600 text-sm">
                  {formik.errors.name}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter your email..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-600 text-sm">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter your password..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-600 text-sm">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                className="block w-full px-4 py-2 text-sm border rounded-lg focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
                placeholder="Confirm your password..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <span className="text-red-600 text-sm">
                  {formik.errors.rePassword}
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

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </section>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Register;
