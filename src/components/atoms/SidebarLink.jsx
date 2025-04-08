/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const SidebarItem = ({
  linkType,
  data,
  Icon,
  sidebarSize,
  label,
  iconColor,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <li
      className={`group transition-all duration-500 ${
        sidebarSize === "big" ? "pr-5" : sidebarSize === "small" ? "pr-2" : ""
      }`}
    >
      {linkType === "link" ? (
        <NavLink
          to={data.to}
          className={`flex items-center py-[6px] w-full rounded-r-full group-hover:bg-[#0F1015] transition-all duration-300 ${
            sidebarSize === "big"
              ? "px-5"
              : sidebarSize === "small"
              ? "px-4"
              : ""
          }`}
        >
          <div className="p-[8px] bg-[#4b506844] rounded-full mr-3 group-hover:bg-[#22242E] transition-all duration-500">
            <data.icon className={`text-mg ${data.iconColor}`} />
          </div>
          {sidebarSize === "big" && (
            <p className="text-[#6c7293] group-hover:text-white transition-all duration-300">
              {data.label}
            </p>
          )}
        </NavLink>
      ) : (
        <div>
          <button
            onClick={handleToggleDropdown}
            className={`flex items-center py-[6px] w-full rounded-r-full group-hover:bg-[#0F1015] transition-all duration-300 ${
              sidebarSize === "big"
                ? "px-5"
                : sidebarSize === "small"
                ? "px-4"
                : ""
            }`}
          >
            <div className="p-[8px] bg-[#4b506844] rounded-full mr-3 group-hover:bg-[#22242E] transition-all duration-500">
              <Icon className={`text-mg ${iconColor}`} />
            </div>
            {sidebarSize === "big" && (
              <p className="text-[#6c7293] group-hover:text-white transition-all duration-300">
                {label}
              </p>
            )}
            <MdOutlineArrowForwardIos
              className={`ml-auto text-[#6c7293] group-hover:text-white transition-all duration-300 ${
                openDropdown ? "rotate-90" : ""
              }`}
            />
          </button>
          {openDropdown && (
            <ul className="bg-[#191C24] rounded-r-xl">
              {data.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="flex items-center py-[6px] w-full rounded-r-full hover:bg-[#0F1015] transition-all duration-300 px-4 pl-6"
                  >
                    <div className="p-[4px] bg-[#4b506844] rounded-full mr-3 hover:bg-[#22242E] transition-all duration-500">
                      <link.icon className={`text-mg ${link.iconColor}`} />
                    </div>
                    {sidebarSize === "big" && (
                      <p className="text-[#6c7293] hover:text-white transition-all duration-300">
                        {link.label}
                      </p>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
