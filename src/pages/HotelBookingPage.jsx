import { useParams } from "react-router-dom";
import UpperTitle from "../components/molecule/UpperTitle";
import { useEffect, useState } from "react";
import {
  getRoomTypeAndRoomsByTypeId,
  getRoomTypeAndRoomsByTypeIdnoDates,
} from "../api/endpoints/booking";
import { useTranslation } from "react-i18next";
import BookingForm from "../components/organism/BookingForm";
import familyImage from "../assets/images/familyRoom.jpeg";
import RoomsSection from "../components/organism/RoomsSection";
import RoomAndSuitesSection from "../components/organism/RoomAndSuitesSection";

export default function HotelBookingPage() {
  const { i18n } = useTranslation("roomAndBooking");
  const { id: typeId } = useParams();
  const [mainData, setMainData] = useState();
  const [roomsData, setRoomsData] = useState([]);

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  useEffect(() => {
    async function fetchRoomTypeWithoutDates() {
      const response = await getRoomTypeAndRoomsByTypeIdnoDates(typeId);
      const { description, id, name, Rooms } = response.data;
      setMainData({ description, id, name });
      setRoomsData(Rooms);
    }

    fetchRoomTypeWithoutDates();
  }, [typeId]);

  async function fetchRoomType(inDate, outDate) {
    const response = await getRoomTypeAndRoomsByTypeId(typeId, inDate, outDate);
    const { description, id, name, Rooms } = response.data;

    setMainData({ description, id, name });
    setRoomsData(Rooms);
  }

  const handleFilterSubmit = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
    fetchRoomType(newCheckIn, newCheckOut);
  };

  return (
    <div className="flex flex-col bg-[#f6f0e8] ">
      <UpperTitle
        title={mainData?.name[i18n.language || "en"]}
        description={mainData?.description[i18n.language || "en"]}
        withDesc={true}
        imgSrc={roomsData[0]?.RoomImages[0]?.image_name_url || familyImage}
      />
      <BookingForm roomTypeId={typeId} />
      <RoomsSection
        rooms={roomsData}
        roomType={mainData}
        onFilter={handleFilterSubmit}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
      />
      <RoomAndSuitesSection />
    </div>
  );
}
