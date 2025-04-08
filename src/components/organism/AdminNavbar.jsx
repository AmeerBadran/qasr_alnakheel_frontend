/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { TfiMenu } from "react-icons/tfi";
import { GrLanguage } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../features/langData/langSlice";

export default function AdminNavbar({ sidebarSize, setSidebarSize, isHalfScreen }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.lang);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const changeSize = () => {
    setSidebarSize(sidebarSize === "big" ? "small" : "big");
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    dispatch(setLanguage(newLang));
  };

  return (
    <nav
      className={`bg-[#191c24] z-10 h-[70px] w-full flex items-center justify-between fixed shadow-lg shadow-[#22222277] px-4 pr-4 ${
        sidebarSize === "big"
          ? "clc-width-244"
          : sidebarSize === "small"
          ? "clc-width-70"
          : ""
      } transition-all ease-in-out duration-200`}
    >
      <div className="flex items-center gap-6">
        {isHalfScreen && (
          <h1 className="text-gray-100 font-bold px-1 py-1 tracking-wide text-xl md:text-2xl">
            HR
          </h1>
        )}
        <button type="button" className="text-white text-2xl" onClick={changeSize}>
          <TfiMenu />
        </button>
      </div>
      
      <button
        onClick={toggleLanguage}
        className="p-2 hover:bg-gray-700 rounded flex items-center mr-12"
      >
        <GrLanguage className="text-3xl text-white" />
        <span className="ml-2 text-white text-lg">{language.toUpperCase()}</span>
      </button>
    </nav>
  );
}
