import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const { accessToken } = useContext(AuthContext);
  const headers = {
    token: accessToken,
  };
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  async function getCart() {
    try {
      const { data } = await axios.get(endPoint, { headers });
      // console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setUserId(data.data.cartOwner);
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      // console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setUserId(data.data.cartOwner);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  async function removeFromCart(productId) {
    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setUserId(data.data.cartOwner);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  async function removeAllProducts() {
    try {
      const { data } = await axios.delete(endPoint, {
        headers,
      });
      setNumOfCartItems(0);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setUserId(data.data.cartOwner);
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }

  async function updateQuantity(productId, count) {
    try {
      const { data } = await axios.put(
        `${endPoint}/${productId}`,
        { count },
        {
          headers,
        }
      );
      // console.log(data);
      setNumOfCartItems(data.numOfCartItems);
      setCartDetails(data.data);
      setCartId(data.data._id);
      setUserId(data.data.cartOwner);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  async function getPayment(url, shippingAddress) {
    try {
      const { data } = await axios.post(url, { shippingAddress }, { headers });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }

  useEffect(() => {
    accessToken && getCart();
  }, [accessToken]);

  return (
    <CartContext.Provider
      value={{
        removeFromCart,
        removeAllProducts,
        cartDetails,
        numOfCartItems,
        getCart,
        addToCart,
        updateQuantity,
        getPayment,
        cartId,
        userId,
        setNumOfCartItems,
        setCartDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
