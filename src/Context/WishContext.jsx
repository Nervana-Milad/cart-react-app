import axios from "axios";
// import { createContext } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishContext = createContext();

export default function WishContextProvider({ children }) {
  const endPoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const { accessToken } = useContext(AuthContext);
  const headers = {
    token: accessToken,
  };
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post(endPoint, { productId }, { headers });
      getWishlist();
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }

  async function getWishlist() {
    try {
      const { data } = await axios.get(endPoint, { headers });
      setWishlistCount(data.count);
      setWishlistDetails(data.data);
      setWishlistId(data.data._id);

      return data;
    } catch (error) {
      return error;
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios.delete(`${endPoint}/${productId}`, {
        headers,
      });
      getWishlist();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  useEffect(() => {
    accessToken && getWishlist();
  }, [accessToken]);

  return (
    <WishContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        wishlistCount,
        wishlistDetails,
        removeFromWishlist,
        wishlistId,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
