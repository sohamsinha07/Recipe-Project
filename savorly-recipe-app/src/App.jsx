import HomePage from "./routes/HomePage";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet} from "react-router-dom";

export default function App() {
  return (
    <>
	  <Navbar />
	  <Outlet />
    </>
  );
}
