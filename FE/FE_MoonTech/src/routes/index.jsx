import { Route, Routes } from "react-router";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Home from "../pages/user/home/home";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </>
  );
}
