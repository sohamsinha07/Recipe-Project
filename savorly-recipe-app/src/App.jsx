import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./components/ChatPage";
import RecipeDetailsPage from "./routes/RecipeDetailsPage";

export default function App() {
  return (
    <>
	<RecipeDetailsPage></RecipeDetailsPage>
      {/* <Navbar />
      <Outlet />   */}
    </>
  );
}
