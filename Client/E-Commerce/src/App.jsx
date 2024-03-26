import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import Products, {
  loader as productsLoader,
} from "./features/Products/Products";
import Cart from "./features/Cart/Cart";
import Product, { loader as productLoader } from "./features/Products/Product";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./ui/ProtectedRoute";
import AdminHomePage from "./pages/AdminHomePage";
import AdminProtectedRoute from "./ui/AdminProtectedRoute";
import AdminOrders from "./pages/AdminOrders";
import MainLayout from "./layouts/MainLayout";
import AdminOrder from "./pages/AdminOrder";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileDetails from "./features/Profile/ProfileDetails";
import UserAddress from "./features/Profile/UserAddress";
import Test from "./features/Profile/Test";
import TestForm from "./features/Profile/TestForm";
import AllProducts from "./pages/AllProducts";
import EditProfile from "./features/Profile/EditProfile";
import Home from "./pages/Home";
import AdminProducts from "./features/Administration/AdminProducts";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminProductCreate from "./pages/AdminProductCreate";
import Password from "./pages/Password";
import ErrorPage from "./pages/ErrorPage";
import InvoicePage from "./pages/InvoicePage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/products",
            element: <AllProducts />,
            // loader: productsLoader,
          },

          {
            path: "/products/:id",
            element: <Product />,
            // loader: productLoader,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/checkout",
            element: (
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            ),
          },
          {
            path: "orders",
            element: (
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            ),
          },
          {
            path: "orders/:id",
            element: (
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            ),
          },
          {
            path: "invoice/:id",
            element: (
              <ProtectedRoute>
                <InvoicePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "",
                element: <ProfileDetails />,
              },
              {
                path: "edit",
                element: <EditProfile />,
              },
              {
                path: "address",
                element: <Test />,
              },
              {
                path: "address/add",
                element: <TestForm />,
              },
              {
                path: "address/edit/:id",
                element: <TestForm />,
              },
              {
                path: "password",
                element: <Password />,
              },
            ],
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "/admin",
        element: (
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <AdminHomePage />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "orders/:id",
            element: <AdminOrder />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "products/:id",
            element: <p>Product</p>,
          },
          {
            path: "products/:id/edit",
            element: <AdminProductEdit />,
          },
          {
            path: "products/add",
            element: <AdminProductCreate />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
