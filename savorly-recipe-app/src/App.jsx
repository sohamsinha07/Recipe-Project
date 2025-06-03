import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeDetailsPage from "./routes/RecipeDetailsPage";

export default function App() {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      {!isRegisterPage && <Navbar />}
      <Outlet />
    </>
  );
}
