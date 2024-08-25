import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

export default ProtectedRoute;
