import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


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
