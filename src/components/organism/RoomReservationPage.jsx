import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */
export default function RoomReservationPage({ roomData }) {
  const { t, i18n } = useTranslation("roomAndBooking");
  console.log(roomData);
  if (!roomData) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }
  return (
    <div className="max-w-[1400px] mx-auto  mt-10 p-8">
      <div className="flex flex-col lg:flex-row  gap-10 text-[#888] ">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          <p>{t("roomAndBooking.singleRoom.description")}</p>
          <p>{roomData.RoomType.description.en}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="space-y-2 list-disc list-inside">
              <li>Eu libero varius maximus in lectus vulputate</li>
              <li>Faucibus quis vehicula condimentum fusce</li>
              <li>Dolor hac cras pellentesque nec molestie</li>
              <li>Egestas sem cras nullam curabitur blandit</li>
            </ul>
            <ul className="space-y-2 list-disc list-inside">
              <li>Capacity : 4 Persons</li>
              <li>Size : 200sq.ft</li>
              <li>Bed : King Size</li>
              <li>View : City View</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-black border-b pb-2">
            Room Amenities
          </h2>
          <div className="grid 2xmobile:grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
            {roomData.Services.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <img
                  src={service.image}
                  alt={service.name.en}
                  className="w-6 h-6"
                />
                <span>{service.name.en}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[400px] bg-my-color text-white p-6 space-y-4 ">
          <h2 className="text-2xl font-semibold text-white">
            Your Reservation
          </h2>

          <div>
            <label className="block mb-1">Check-in</label>
            <input
              type="date"
              defaultValue="2025-04-14"
              className="w-full p-2 border rounded text-gray-900"
            />
          </div>

          <div>
            <label className="block mb-1">Check-out</label>
            <input
              type="date"
              defaultValue="2025-04-15"
              className="w-full p-2 border rounded text-gray-900"
            />
          </div>

          <div>
            <label className="block mb-1">Rooms</label>
            <select className="w-full p-2 border rounded text-gray-900">
              <option>1 Room</option>
              <option>2 Rooms</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Guests</label>
            <select className="w-full p-2 border rounded text-gray-900">
              <option>1 Adult</option>
              <option>2 Adults</option>
            </select>
          </div>

          <div className="pt-2 text-sm">
            <strong>Your Price</strong>
            <div>NIS 65.00 / per room</div>
          </div>

          <button className="w-full bg-[#bfa276] text-white py-2 rounded mt-2 hover:bg-[#a89064] transition">
            Book Your Stay
          </button>
        </div>
      </div>
      {roomData.RoomImages && roomData.RoomImages.length > 0 && (
        <div className="w-full mt-10">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Room Gallery
          </h2>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* الصورة الرئيسية */}
            <div className="flex-1">
              <img
                src={roomData.RoomImages[0].image_name_url}
                alt="Main Room"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>

            {/* صور إضافية */}
            <div className="lg:w-[300px] flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto">
              {roomData.RoomImages.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image.image_name_url}
                  alt={`Room ${index + 2}`}
                  className="w-40 h-32 object-cover rounded-lg flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
