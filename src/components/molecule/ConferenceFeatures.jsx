import { useTranslation } from "react-i18next";
import bg_image from "../../assets/images/companyHall.jpg";
import {
  FaMapMarkerAlt,
  FaTv,
  FaThList,
  FaWifi,
  FaUtensils,
  FaBell,
  FaParking,
  FaShieldAlt,
  FaWater,
  FaBuilding,
} from "react-icons/fa";

const featuresList = [
  { icon: FaMapMarkerAlt, key: "central_location" },
  { icon: FaTv, key: "modern_equipment" },
  { icon: FaThList, key: "flexible_seating" },
  { icon: FaWifi, key: "high_speed_internet" },
  { icon: FaUtensils, key: "on_site_catering" },
  { icon: FaBell, key: "event_support" },
  { icon: FaParking, key: "parking" },
  { icon: FaShieldAlt, key: "quiet_environment" },
  { icon: FaWater, key: "acoustic_design" },
  { icon: FaBuilding, key: "tech_friendly" },
];

export default function ConferenceFeatures() {
  const { t } = useTranslation();

  return (
    <div className="pt-60 bg-my-color relative flex">
      <h1></h1>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 z-20 text-white">
        {featuresList.map(({ icon: Icon, key }, index) => {
          const isMiddle = index % 3 === 1;
          const isLast = index === featuresList.length - 1;
          const shouldCenterLast = featuresList.length % 3 === 1 && isLast;

          return (
            <div
              key={key}
              className={`p-4 bg-[#212124] max-w-72 h-64 transition-all duration-300 
        ${isMiddle ? "lg:-mt-20" : ""} 
        ${shouldCenterLast ? "lg:col-start-2 lg:-mt-20" : ""}`}
            >
              <div className="flex flex-col items-start justify-around h-full bg-[#D9D9D904] p-3 shadow-md text-center">
                <div className="bg-primary/10 gap-2 flex w-full justify-between text-primary p-3 rounded-full text-center">
                  <Icon className="w-6 h-6" />
                  <h3 className="text-lg font-semibold flex-1">
                    {t(`conferenceFeatures.${key}.title`)}
                  </h3>
                </div>
                <div className="w-full">
                  <p className="text-base text-center">
                    {t(`conferenceFeatures.${key}.description`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <img
        src={bg_image}
        alt=""
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/60"></div>
    </div>
  );
}
