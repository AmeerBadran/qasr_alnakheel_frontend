import { RiDashboard2Fill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineBedroomParent, MdOutlineCreateNewFolder } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const sidebarItems = [
  {
    linkType: "link",
    Icon: FaMoneyCheckDollar,
    data: {
      to: "/admin/",
      icon: RiDashboard2Fill,
      label: "sidebar.dashboard", 
      iconColor: "text-purple-700",
    },
  },
  {
    typeLink: "dropdown",
    Icon: IoHomeOutline,
    label: "sidebar.room", // مفتاح i18n
    iconColor: "text-amber-500",
    data: [
      {
        to: "/admin/roomtype",
        icon: MdOutlineBedroomParent,
        label: "sidebar.roomType",
        iconColor: "text-amber-500",
      },
      {
        to: "/admin/allamenities",
        icon: IoIosMenu,
        label: "sidebar.allAmenities",
        iconColor: "text-[#007bff]",
      },
      {
        to: "/admin/allservice",
        icon: IoIosMenu,
        label: "sidebar.allService",
        iconColor: "text-[#007bff]",
      },
      {
        to: "/admin/allroom",
        icon: IoIosMenu,
        label: "sidebar.allRoom",
        iconColor: "text-[#007bff]",
      },
    ],
  },
  {
    typeLink: "dropdown",
    Icon: MdOutlineCreateNewFolder,
    label: "sidebar.createRoom", // مفتاح i18n
    iconColor: "text-amber-500",
    data: [
      {
        to: "/admin/addroom",
        icon: MdOutlineBedroomParent,
        label: "sidebar.addRoom",
      },
    ],
  },
];

export default sidebarItems;
