import { useEffect, useState } from "react";
import { getRoomsAndSuites } from "../../api/endpoints/mainPages";
import { useTranslation } from "react-i18next";
import ImageCarousel from "../molecule/ImageCarousel";
import { Link } from "react-router-dom";

export default function RoomAndSuitesSection() {
  const { t } = useTranslation("home");
  const [roomsImages, setRoomsImages] = useState([]);

  useEffect(() => {
    const fetchRoomsImages = async () => {
      try {
        const response = await getRoomsAndSuites();
        setRoomsImages(response.data.roomTypes);
      } catch (error) {
        console.error("Error fetching rooms images:", error);
      }
    };

    fetchRoomsImages();
  }, []);

  return (
    <div className=" text-white w-full flex flex-col items-center gap-8 pt-16 mb-10 overflow-hidden">
      <h2 className="text-5xl font-bold text-center z-20">
        {t("home.roomsSection.title")}
      </h2>
      <p className="text-lg font-semibold max-w-2xl z-20">
        {t("home.roomsSection.description")}
      </p>
      <div className="w-full max-w-[1300px] mx-auto px-4">
        <ImageCarousel images={roomsImages} />
      </div>
      <Link
        to="/rooms"
        className="px-4 py-2 mt-14 bg-sec-color-100 text-white rounded-sm hover:bg-sec-color-200  transition duration-200 z-20"
      >
        {t("home.roomsSection.button")}
      </Link>
    </div>
  );
}
