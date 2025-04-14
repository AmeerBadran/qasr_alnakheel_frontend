/* eslint-disable react/prop-types */
import { FaBookReader, FaVectorSquare } from "react-icons/fa";
import { LiaBathSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { MdOutlineBedroomChild } from "react-icons/md";
import { Link } from "react-router-dom";

export default function RoomCard({ room, roomType }) {
  const { t, i18n } = useTranslation("roomAndBooking");
  return (
    <div>
      <div
        key={room.id}
        className="bg-white shadow border border-gray-200 group overflow-hidden"
      >
        <div className="relative">
          <img
            src={`${room.RoomImages[0].image_name_url}`}
            alt={room.room_no}
            className="w-full h-60 object-cover group-hover:scale-105 ease-out transition duration-500"
          />
          <span className="absolute top-4 right-4 font-serif bg-[#9e8559] shadow shadow-gray-600 text-white px-4 py-1 text-sm">
            {i18n.language === "ar" && t("roomAndBooking.Night") + "/"}
            {room.RoomPricings[0].price}
            {i18n.language === "en" && "/" + t("roomAndBooking.Night")}
          </span>
        </div>
        <div className="text-left p-5">
          <h3 className="text-lg font-semibold flex gap-1 items-center mb-2 text-gray-700">
            <MdOutlineBedroomChild />
            {roomType.name[i18n.language || roomType.name.en]} - {room.room_no}{" "}
          </h3>
          <div className="flex items-center text-gray-600 text-xs gap-4 mb-4">
            <span className="flex items-center gap-1">
              <FaVectorSquare className="w-4 h-4" /> {room.room_length}
              {"  "}
              {t("roomAndBooking.ft")}
            </span>
            <span className="flex items-center gap-1">
              <IoPeopleOutline className="w-5 h-5" /> {room.capacity}{" "}
              {t("roomAndBooking.guests")}
            </span>
            <span className="flex items-center gap-1">
              <LiaBathSolid className="w-5 h-5" /> {room.num_of_baths}{" "}
              {t("roomAndBooking.bath")}
            </span>
          </div>
          <Link
            to={`/rooms/roomdetails/${room.id}`}
            className="text-sm font-semibold flex gap-1 items-center text-gray-700 border-b-2 border-transparent hover:border-gray-800 transition"
          >
            {t("roomAndBooking.readMore")} <FaBookReader />
          </Link>
        </div>
      </div>
    </div>
  );
}
