import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = useSelector((store) => store.user.token);

  return <>{token ? children : <Navigate to="/auth/login" />}</>;
}

export default ProtectedRoute;
