import { RiDashboard2Fill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineBedroomParent } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";

import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
const sidebarItems = [
  {
    linkType: "link", Icon: FaMoneyCheckDollar, data: { to: "/admin/", icon: RiDashboard2Fill, label: "Dashboard", iconColor: "text-purple-700" },
  },
  {
    typeLink: "dropdown", Icon: IoHomeOutline, label: "Room", iconColor: "text-amber-500", data: [
      { to: "/admin/roomtype", icon: MdOutlineBedroomParent, label: "Room Type", iconColor: "text-amber-500" },
      { to: "/admin/allamenities", icon: IoIosMenu, label: "All Amenities", iconColor: "text-[#007bff]" },
      { to: "/admin/allservice", icon: IoIosMenu, label: "All Service", iconColor: "text-[#007bff]" },
      { to: "/admin/allroom", icon: IoIosMenu, label: "All Room", iconColor: "text-[#007bff]" },

    ]
  },
  {
    typeLink: "dropdown", Icon: MdOutlineCreateNewFolder, label: "createroom", iconColor: "text-amber-500", data: [
      { to: "/admin/addroom", icon: MdOutlineBedroomParent, label: "AddRoom" },
    ]
  },
];

export default sidebarItems;

