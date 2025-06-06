import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import App from "./App";
import HomePage from "./routes/HomePage";
import RegisterPage from "./routes/RegisterPage";
import RecipesPage from "./routes/RecipesPage";
import CategoriesPage from "./routes/CategoriesPage";
import MyKitchenPage from "./routes/MyKitchenPage";
import RecipeDetailsPage from "./routes/RecipeDetailsPage";
import CreateRecipePage from "./routes/CreateRecipePage";
import AdminPage from "./routes/AdminPage";
import AdminLayout from "./components/admin/AdminLayout";
import EditRecipePage from "./routes/EditRecipePage";
import ForgotPassword from "./routes/ForgotPassword";

import "./styles/global.css";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // When someone visits "/", load HomePage
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "recipes", element: <RecipesPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "my_kitchen", element: <MyKitchenPage /> },
      { path: "recipe/:type/:id", element: <RecipeDetailsPage /> },
      { path: "create_recipe", element: <CreateRecipePage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "edit/:id", element: <EditRecipePage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />, // no navbar
    children: [{ index: true, element: <AdminPage /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
