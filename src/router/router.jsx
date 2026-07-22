import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../page/Home";
import Product from "../page/Product";
import Training from "../page/Training";
import Recharge from "../page/Recharge";
import Shops from "../page/Shops";
import ShopDetails from "../page/ShopDetails";
import ShopProductDetails from "../page/ShopProductDetails";
import About from "../page/About";
import Contact from "../page/Contact";
import Auth from "../page/Auth";
import Profile from "../page/Profile";
import ProductDetails from "../page/ProductDetails";
import Myshop from "../page/Myshop";
import ViewInShop from "../page/ViewInShop";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import TermsCon from "../page/TermsCon";
import ProvacyPolicy from "../page/ProvacyPolicy";
import NotFound from "../page/NotFound";
import ErrorPage from "../page/ErrorPage";
import Checkout from "../page/Checkout";
import OrderSuccess from "../page/OrderSuccess";
import Compare from "../page/Compare";
import Cart from "../page/Cart";

import DashboardLayout from "../layout/DashboardLayout";
import Brands from "../page/Brands";
import Categories from "../page/Categories";

// Dashboard Pages
import Orders from "../page/dashboard/Orders";
import OrderDetails from "../page/dashboard/OrderDetails";
import Wallet from "../page/dashboard/Wallet";
import MyGarage from "../page/dashboard/MyGarage";
import ProfileTraining from "../page/dashboard/Training";
import Settings from "../page/dashboard/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/product", element: <Product /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/brands", element: <Brands /> },
      { path: "/categories", element: <Categories /> },
      { path: "/cart", element: <Cart /> },
      { path: "/training", element: <Training /> },
      { path: "/view-in-shop/:id", element: <ViewInShop /> },
      { path: "/recharge", element: <Recharge /> },
      { 
        path: "/shops", 
        element: (
          <ProtectedRoute restrictedRoles={['shop_owner']} fallbackRedirect="/myshop">
            <Shops />
          </ProtectedRoute>
        )
      },
      { 
        path: "/shops/:id", 
        element: (
          <ProtectedRoute restrictedRoles={['shop_owner']} fallbackRedirect="/myshop">
            <ShopDetails />
          </ProtectedRoute>
        )
      },
      { path: "/shop-products/:id", element: <ShopProductDetails /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/auth", element: <Auth /> },
      { path: "/terms", element: <TermsCon /> },
      { path: "/privacy", element: <ProvacyPolicy /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/compare", element: <Compare /> },
      { path: "*", element: <NotFound /> }
    ]
  },
  {
    // Dashboard Routes (Standalone Layout)
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/myshop", element: <Myshop /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/orders", element: <Orders /> },
      { path: "/profile/orders/:id", element: <OrderDetails /> },
      { path: "/profile/wallet", element: <Wallet /> },
      { path: "/profile/vehicles", element: <MyGarage /> },
      { path: "/profile/training", element: <ProfileTraining /> },
      { path: "/profile/settings", element: <Settings /> },
    ]
  }
]);
