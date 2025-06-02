import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./routes/HomePage";
import ProfilePage from "./routes/ProfilePage";
import RecipesPage from "./routes/RecipesPage";
import CategoriesPage from "./routes/CategoriesPage";
import MyKitchenPage from "./routes/MyKitchenPage";

import "./styles/global.css";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // When someone visits "/", load HomePage
      { index: true, element: <HomePage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "my_kitchen", element: <MyKitchenPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
