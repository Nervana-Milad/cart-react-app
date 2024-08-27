import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import MyOrders from "./components/MyOrders/MyOrders";
import CartContextProvider from "./Context/CartContext";
import WishContextProvider from "./Context/WishContext";
import Wishlist from "./components/Wishlist/Wishlist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NewPassword from "./components/NewPassword/NewPassword";
function App() {
  const queryClient = new QueryClient();
  const router = createHashRouter([
    {
      path: "",
      element: <Layout></Layout>,
      errorElement: <Error></Error>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist></Wishlist>
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories></Categories>
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout></Checkout>
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <MyOrders></MyOrders>
            </ProtectedRoute>
          ),
        },
        {
          path: "/resetpassword",
          element: (
            <ProtectedRoute>
              <ResetPassword></ResetPassword>
            </ProtectedRoute>
          ),
        },
        {
          path: "/enternewpassword",
          element: (
            <ProtectedRoute>
              <NewPassword></NewPassword>
            </ProtectedRoute>
          ),
        },
        {
          path: "/forgetpassword",
          element: <ForgetPassword></ForgetPassword>,
        },
        {
          path: "/product-details/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "*",
          element: <NotFound></NotFound>,
        },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishContextProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>
              <ReactQueryDevtools />
              <ToastContainer />
            </QueryClientProvider>
          </WishContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
