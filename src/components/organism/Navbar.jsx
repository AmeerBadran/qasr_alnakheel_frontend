import mainLogo from "../../assets/images/logo.png";
import { IoMdPersonAdd, IoMdClose } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import NavLinks from "../atoms/NavLink";
import AuthButton from "../atoms/AuthBotton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuthData } from "../../features/authData/authDataSlice";
import { logOut } from "../../api/endpoints/auth";

function Navbar() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.authData.userId);
  const [isHalfScreen, setIsHalfScreen] = useState(window.innerWidth > 950);
  const [openNav, setOpenNav] = useState(false);

  const handleLogOut = async () => {
    await logOut();
    dispatch(deleteAuthData());
  };
  useEffect(() => {
    const handleResize = () => {
      setIsHalfScreen(window.innerWidth > 950);
      if (isHalfScreen !== window.innerWidth > 950) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isHalfScreen]);

  const handleNavButton = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="w-full absolute z-50 border-b border-gray-600 shadow-xl bg-my-color">
      <header
        className={` max-w-[1400px] mx-auto flex items-center justify-between h-24 px-4 relative`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src={mainLogo} alt="Logo" className="h-16" />
        </Link>
        {isHalfScreen ? (
          <>
            <ul className="flex gap-6 slg:gap-8 xl:gap-14 justify-center items-center p-4 ">
              <NavLinks linksLayout={"fullPage"} bgColor={"dark"} />
            </ul>
            <div className="flex gap-1">
              {!id ? (
                <>
                  <AuthButton
                    label="Sign Up"
                    icon={IoMdPersonAdd}
                    roundedPosition="left"
                    bgType="dark"
                    to={"signUp"}
                  />
                  <AuthButton
                    label="Log In"
                    icon={IoLogIn}
                    roundedPosition="right"
                    bgType="dark"
                    to={"logIn"}
                  />
                </>
              ) : (
                <AuthButton
                  label="LogOut"
                  icon={IoLogOut}
                  roundedPosition="full"
                  onClick={handleLogOut}
                  bgType="dark"
                />
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={handleNavButton}
            className="flex justify-center items-center w-10 h-10 min-w-10 rounded-md bg-white"
          >
            {!openNav ? (
              <FaBars className="text-my-color text-2xl" />
            ) : (
              <IoMdClose className="text-my-color text-3xl" />
            )}
          </button>
        )}
        <div
          className={`absolute bg-gray-200 right-2 left-2 rounded-md p-5 transition-all duration-300 border-2 border-black ${
            openNav && !isHalfScreen
              ? "top-24 opacity-100 z-50 "
              : "-top-96 opacity-0 -z-50"
          }`}
        >
          <div className="flex flex-col w-full justify-between">
            <ul className="flex flex-col flex-1 gap-4 justify-start items-start w-full">
              <NavLinks
                linksLayout={"halfPage"}
                bgColor={"light"}
                handleNavButton={handleNavButton}
              />
            </ul>
            <div className="flex gap-1 mt-5 flex-col max-w-44 border-t border-my-color pt-2">
              {!id ? (
                <>
                  <AuthButton
                    label="Sign Up"
                    icon={IoMdPersonAdd}
                    roundedPosition="full"
                    bgType="light"
                    to={"signUp"}
                  />
                  <AuthButton
                    label="Log In"
                    icon={IoLogIn}
                    roundedPosition="full"
                    bgType="light"
                    to={"logIn"}
                  />
                </>
              ) : (
                <AuthButton
                  label="LogOut"
                  icon={IoLogOut}
                  roundedPosition="full"
                  onClick={handleLogOut}
                  bgType="light"
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
