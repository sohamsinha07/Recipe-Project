import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./routes/HomePage";
import RegisterPage from "./routes/RegisterPage";
import ProfilePage from "./routes/ProfilePage";
import RecipesPage from "./routes/RecipesPage";
import CategoriesPage from "./routes/CategoriesPage";
import MyKitchenPage from "./routes/MyKitchenPage";
import RecipeDetailsPage from "./routes/RecipeDetailsPage";
import CreateRecipePage from "./routes/CreateRecipePage";

import "./styles/global.css";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // When someone visits "/", load HomePage
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "my_kitchen", element: <MyKitchenPage /> },
      { path: "profile", element: <ProfilePage /> },
	  { path: "recipe/:type/:id", element: <RecipeDetailsPage /> },
    { path: "create_recipe", element: <CreateRecipePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
