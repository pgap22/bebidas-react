import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Favoritos from "./components/Favoritos";
import { BebidasProvider } from "./context/BebidasContext";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BebidasProvider>
        <App />
      </BebidasProvider>
    ),
  },
  {
    path: "/favoritos",
    element: (
      <BebidasProvider>
        <Favoritos />
      </BebidasProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
