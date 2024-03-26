import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/Users/userSlice";
import { clearOrders } from "../features/Orders/OrderSlice";
import toast from "react-hot-toast";
import { getTokenDuration } from "../utils/auth";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const token = useSelector((store) => store.user.token);
  const mode = useSelector((store) => store.user?.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    if (token === "EXPIRED") {
      dispatch(logout());
      dispatch(clearOrders());

      toast.success("Session Timed Out! Please Login Again!");
      return;
    }
    const tokenDuration = getTokenDuration();

    const interval = setTimeout(() => {
      dispatch(logout());
      dispatch(clearOrders());
      toast.success("Session Timed Out! Please Login Again!");
    }, tokenDuration);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default MainLayout;
