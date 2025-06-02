import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./components/ChatPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
