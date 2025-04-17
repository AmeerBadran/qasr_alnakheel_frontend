import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "/marker-icon-2x.png";
import markerIcon from "/marker-icon.png";
import markerShadow from "/marker-shadow.png";

import aboutImage from "../assets/images/aboutImage.jpeg";
import aboutImage2 from "../assets/images/aboutImage2.jpeg";
import mainAboutImage from "../assets/images/poolImage.jpeg";

import L from "leaflet";
import UpperTitle from "../components/molecule/UpperTitle";
import i18next from "i18next";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const stats = [
  { label: "Guest Stay", value: 768 },
  { label: "Book Room", value: 632 },
  { label: "Member Stay", value: 1024 },
  { label: "Meals Served", value: 256 },
];

export default function About() {
  return (
    <div className="bg-back-color text-white font-sans">
      {/* Hero Section */}
      <UpperTitle
        title={i18next.language === "en" ? "About Us" : "من نحن"}
        description={"asf"}
        withDesc={false}
        imgSrc={mainAboutImage}
        showFrom={false}
      />
      <div className=" relative flex flex-col bg-about-back bg-cover bg-no-repeat bg-center">
        <div className=" absolute top-0 w-full h-full bg-my-color/90"></div>
        {/* Description Section */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center  max-w-[1300px] mx-auto z-10">
          <div className="ml-4 justify-self-center">
            <div className="border-8 rounded-2xl shadow-lg shadow-gray-500">
              <div className="shadow-inner-shadow shadow-white/20 p-5">
                <img
                  src={aboutImage}
                  alt="Bouncing Image"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg leading-relaxed"
          >
            Qasr alnkheel Resort and Hotel in Jericho offers 5-star
            accommodation with an outdoor pool, free parking, and a restaurant.
            Rooms feature air conditioning, a flat-screen TV, and private
            bathroom. Free Wi-Fi and a 24-hour front desk are available. It is
            2.4 km from Bethany Beyond the Jordan and 3.4 km from the Church of
            All Nations.
          </motion.p>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 2md:grid-cols-2 max-w-[1300px] mx-auto gap-12 items-center p-8 mt-20 mb-8 border-b pb-20 z-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className=" justify-self-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              WHY GUEST CHOOSE HOTEL?
            </h2>
            <p className="text-lg leading-relaxed">
              A convenient location, comfortable accommodations with amenities,
              cleanliness, good value pricing, and excellent service influence
              hotel choices. Guest reviews, reputation, unique experiences, and
              eco-friendly practices also play a role.
            </p>
          </motion.div>
          <div className="ml-4 justify-self-center">
            <div className="border-8 rounded-2xl shadow-lg shadow-gray-500">
              <div className="shadow-inner-shadow shadow-white/20 p-5">
                <img
                  src={aboutImage2}
                  alt="Bouncing Image"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Section */}
      <div className="py-10 px-4 text-center ">
        <h2 className="text-3xl font-semibold mb-8">Hotel statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className=" p-6 rounded-xl shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-3xl font-bold text-teal-400">
                {stat.value}
              </div>
              <div className="mt-2 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Section Placeholder */}
      <div className="h-[500px] w-full">
        <MapContainer
          center={[31.8667, 35.45]} // Jericho coordinates
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[31.8667, 35.45]}>
            <Popup>
              Qasr alnkheel Resort and Hotel
              <br /> Jericho
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
