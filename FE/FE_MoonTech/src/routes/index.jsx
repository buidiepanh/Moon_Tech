import { Route, Routes } from "react-router";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Home from "../pages/user/home/home";
import Login from "../pages/authen/login/login";
import Register from "../pages/authen/register/register";
import Details from "../pages/user/product-details/details";
import Cart from "../pages/user/cart/cart";
import Profile from "../pages/user/profile/profile";
import Admin from "../pages/authen/admin/admin";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:productId" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

function AdminRouter() {
  return (
    <>
      <Routes>
        <Route path="" element={<Admin />} />
      </Routes>
    </>
  );
}

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin" element={<AdminRouter />} />
      </Routes>
    </>
  );
}
