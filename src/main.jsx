import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DistribucionNumber from "./pages/DistributionNumber.jsx";
import Models from "./pages/Models.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/models", element: <Models /> },
  { path: "/distribution", element: <DistribucionNumber /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
