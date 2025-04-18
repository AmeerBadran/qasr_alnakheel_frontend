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
import { motion } from "framer-motion";
import { setLanguage } from "../../features/langData/langSlice";
import { IoLanguageSharp } from "react-icons/io5";

function Navbar() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.authData.userId);
  const language = useSelector((state) => state.language.lang);

  const profileImage = useSelector(
    (state) => state.authData?.allUserData?.profile_picture
  );
  const [isHalfScreen, setIsHalfScreen] = useState(window.innerWidth > 950);
  const [openNav, setOpenNav] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    dispatch(setLanguage(newLang));
  };

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
            <ul className="flex gap-3 slg:gap-5 xl:gap-10 justify-center items-center p-4 ">
              <NavLinks linksLayout={"fullPage"} bgColor={"dark"} />
            </ul>
            <div className="relative">
              <button
                onClick={() => setOpenNav(!openNav)}
                className="w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="user"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-gray-400 to-gray-600 w-full h-full flex items-center justify-center text-white text-xl font-bold">
                    U
                  </div>
                )}
              </button>

              {openNav && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 z-50 overflow-hidden animate-fadeIn">
                  <ul className="flex flex-col py-2">
                    {id && (
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setOpenNav(false)}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                        >
                          <IoMdPersonAdd className="text-lg text-my-color" />
                          Profile
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={toggleLanguage}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <IoLanguageSharp />
                        {language === "en" ? "العربية" : "English"}
                      </button>
                    </li>
                    {!id ? (
                      <>
                        <li>
                          <Link
                            to="/signUp"
                            onClick={() => setOpenNav(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                          >
                            <IoMdPersonAdd className="text-lg text-my-color" />
                            Sign Up
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/logIn"
                            onClick={() => setOpenNav(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 font-bold hover:bg-gray-50 transition-colors duration-200"
                          >
                            <IoLogIn className="text-lg text-my-color" />
                            Log In
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setOpenNav(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-3 font-bold text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <IoLogOut className="text-lg" />
                          Log Out
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
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
              <button
                onClick={toggleLanguage}
                className="relative w-20 h-10 bg-gray-700  my-auto rounded-full p-1"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 50, damping: 10 }}
                  className={`w-8 h-8 rounded-full bg-white hover:bg-sec-color-100 font-bold transition-colors duration-200 hover:text-white text-black flex items-center justify-center shadow-md absolute top-1 ${
                    language === "ar" ? "right-1" : "left-1"
                  }`}
                >
                  {language.toUpperCase()}
                </motion.div>
              </button>
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
                <>
                  <AuthButton
                    label="LogOut"
                    icon={IoLogOut}
                    roundedPosition="full"
                    onClick={handleLogOut}
                    bgType="light"
                  />
                  <img
                    src={profileImage}
                    alt="user"
                    className="w-10 h-10 rounded-full my-auto"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
