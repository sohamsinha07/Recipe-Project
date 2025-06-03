import HomePage from "./routes/HomePage";
import Navbar from "./components/Navbar";
import RecipeDetailsPage from "./routes/RecipeDetailsPage";
import { Routes, Route, Outlet} from "react-router-dom";

export default function App() {
  return (
    <>
	  <Navbar />
	  <Outlet />
    </>
  );
}
