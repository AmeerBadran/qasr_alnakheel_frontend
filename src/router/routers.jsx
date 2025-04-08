/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "../components/HOC/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import Contact from "../pages/Contact";
//import ProtectedRoute from "../components/HOC/withProtect";
import Dashboard from "../pages/adminPages/Dashboard";
import AdminLayout from "../components/HOC/AdminLayout";
import AllAmenities from "../pages/adminPages/AllAmenities";
import RoomType from "../pages/adminPages/RoomType";
import Service from "../pages/adminPages/Service";
import AddRoom from "../pages/adminPages/AddRoom";
import AllRoom from "../pages/adminPages/AllRoom";
import UpdateRoom from "../pages/adminPages/UpdateRoom";
//import PersistLogin from "../components/HOC/PersistLogin";
//import NotProtectdRoute from "../components/HOC/withNotProtect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // children: [
    //   {
    //     element: <PersistLogin />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contactUs",
        element: <Contact />,
      },
      {
        path: "/aboutUs",
        element: <About />,
      },
    ],
    //},
    //],
  },
  {
    path: "/admin",
    //element: <ProtectedRoute element={<Admin />} />,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "roomtype",
        element: < RoomType />,
      },
      {
        path: "allamenities",
        element: < AllAmenities />,
      },
      {
        path: "allservice",
        element: < Service />,
      },
      {
        path: "addroom",
        element: < AddRoom />,
      },
      {
        path: "allroom",
        element: < AllRoom />,
      },
      {
        path: "updateroom/:id",
        element: < UpdateRoom />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: () => <h1>Page Not Found</h1>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
