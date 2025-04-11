import { Outlet } from "react-router-dom";
import Navbar from "../organism/Navbar.jsx";
export default function RootLayout() {
  return (
    <div className=" absolute w-full">
      <Navbar />

      <div className="mt-24 bg-slate-400">
        <Outlet />
      </div>
    </div>
  );
}
