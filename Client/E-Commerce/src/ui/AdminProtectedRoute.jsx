import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MessagePage from "./MessagePage";
function AdminProtectedRoute({ children }) {
  const role = useSelector((store) => store.user.userDetails?.role);
  if (!role)
    return <MessagePage message="You Don't Have Access To The Page!" />;
  return <>{children}</>;
}

export default AdminProtectedRoute;
