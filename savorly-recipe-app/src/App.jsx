import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet} from "react-router-dom";


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
