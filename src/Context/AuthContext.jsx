import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  // console.log(accessToken);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
