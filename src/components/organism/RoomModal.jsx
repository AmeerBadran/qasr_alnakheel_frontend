/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";

function RoomModal({ room, onClose }) {
    if (!room) return null;

    const getImageUrl = (imageName) => `/uploads/${imageName}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900/90 p-8 rounded-3xl w-full max-w-4xl relative overflow-y-auto max-h-[90vh] border border-gray-700 shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition"
                >
                    <IoMdClose />
                </button>

                <h2 className="text-white text-3xl font-extrabold mb-8 text-center border-b border-gray-700 pb-4">
                    Room Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                    <Card label="Room Number" value={room.room_no} />
                    <Card label="Category" value={room.category?.en} />
                    <Card label="Capacity" value={`${room.capacity} Guests`} />
                    <Card label="Room Length" value={`${room.room_length} m`} />
                    <Card label="Baths" value={room.num_of_baths} />
                    <Card label="Bed Type" value={room.bed_type?.en} />
                    <Card label="Adults" value={room.adult_guests} />
                    <Card label="Children" value={room.child_guests} />
                    <Card label="Room Type" value={room.RoomType?.name?.en} />
                    <Card
                        label="Status"
                        value={room.isBooked ? "Booked" : "Available"}
                        color={room.isBooked ? "text-red-400" : "text-green-400"}
                    />
                </div>

                <div className="mt-8">
                    <h3 className="text-lg text-gray-300 font-semibold mb-2">Description</h3>
                    <p className="text-gray-100 bg-gray-800/70 p-4 rounded-xl">
                        {room.RoomType?.description?.en}
                    </p>
                </div>

                {room.RoomPricings?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg text-gray-300 font-semibold mb-3">Weekly Prices</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {room.RoomPricings.map((pricing) => (
                                <div
                                    key={pricing.id}
                                    className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-xl text-center shadow-inner"
                                >
                                    <p className="font-bold">{pricing.day_of_week}</p>
                                    <p className="text-gray-300">${pricing.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {room.RoomImages?.length > 0 && (
                    <div className="mt-10">
                        <h3 className="text-lg text-gray-300 font-semibold mb-3">Images</h3>
                        <div className="flex flex-wrap gap-4">
                            {room.RoomImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(img.image_name_url)}
                                    alt={`Room ${index}`}
                                    className="w-32 h-32 object-cover rounded-xl border border-gray-700 shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const Card = ({ label, value, color = "text-white" }) => (
    <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-lg font-semibold mt-1 ${color}`}>{value}</p>
    </div>
);

export default RoomModal;
