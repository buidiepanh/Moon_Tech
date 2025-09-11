import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./routes/index.jsx";
import Header from "./components/header/header.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRouter />
    <Toaster />
  </BrowserRouter>
);
