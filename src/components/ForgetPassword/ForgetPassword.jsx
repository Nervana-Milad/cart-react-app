import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleForgetPassword,
  });

  async function handleForgetPassword(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      if (data.statusMsg === "success") {
        setAccessToken(data.token);
        localStorage.setItem("accessToken", data.token);
        toast.success(data.message);
        navigate("/resetpassword");
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Enter your email..
          </h1>
          {error && (
            <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
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
            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className="w-full py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default ForgetPassword;
