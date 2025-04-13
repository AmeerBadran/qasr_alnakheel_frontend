/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from "../assets/images/logo.png";
const rooms = [
  {
    title: "Deluxe Room",
    desc: "Larger size with enhanced amenities. Great view of the pool or atrium.",
    image: "/images/deluxe.jpg",
  },
  {
    title: "Standard Room",
    desc: "Basic but comfortable room with all essential amenities on a budget.",
    image: "/images/standard.jpg",
  },
  {
    title: "Suite",
    desc: "Bigger spacious rooms include separate sitting area. Perfect for longer stays.",
    image: "/images/suite.jpg",
  },
  {
    title: "Family Room",
    desc: "Designed with families in mind, with extra space and additional beds.",
    image: "/images/family.jpg",
  },
];

export default function HotelBookingPage() {
  const [email, setEmail] = useState("");

  const Button = ({ children, className, ...props }) => (
    <button
      {...props}
      className={`px-4 py-2 rounded text-white font-semibold ${className} `}
    >
      {children}
    </button>
  );

  const Input = ({ className, ...props }) => (
    <input
      {...props}
      className={`px-3 py-2 rounded text-sm border focus:outline-none ${className}`}
    />
  );

  const Card = ({ children, className }) => (
    <div className={`rounded overflow-hidden shadow-lg ${className} gap-5`}>
      {children}
    </div>
  );

  const CardContent = ({ children, className }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );

  return (
    <div className="bg-[#1c1c1f] text-white min-h-screen">
      {/* Steps */}
      <div className="w-full bg-[#2c2c2f] py-6">
        <div className="flex justify-center gap-12 text-center text-white text-sm">
          {["Search", "Booking", "Checkout", "Confirm"].map((step, idx) => (
            <div key={idx}>
              <div className="mb-2 w-6 h-6 rounded-full bg-white mx-auto" />
              <div className="font-semibold">{step}</div>
              <div className="text-xs opacity-75">
                {
                  [
                    "Choose your favorite room",
                    "Enter your booking details",
                    "Use your preferred payment method",
                    "Receive confirmation email",
                  ][idx]
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-[#111] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-between items-end">
          <div className="text-sm text-white space-y-1">
            <div>Check in - Check out</div>
            <div className="bg-white text-black px-2 py-1 rounded">
              15 Dec 2024 - 16 Dec 2024
            </div>
          </div>
          <div className="text-sm text-white space-y-1">
            <div>Rooms / Guests</div>
            <div className="bg-white text-black px-2 py-1 rounded">
              1 Room, 1 Adult, 0 Children
            </div>
          </div>
          <Button className="bg-red-500">Search</Button>
        </div>
      </div>

      {/* Room List */}
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        {rooms.map((room, i) => (
          <Card
            key={i}
            className="flex flex-col md:flex-row bg-[#1e1e20] text-white"
          >
            <img
              src={logo}
              alt={room.title}
              className="w-full md:w-1/3 h-48 object-cover"
            />
            <CardContent className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{room.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{room.desc}</p>
              <div className="flex gap-2 text-white text-xs mb-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-[#444] flex items-center justify-center"
                  >
                    i
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-right text-white text-lg font-bold">
                    199
                  </div>
                  <div className="text-right text-xs text-gray-300">
                    per night
                  </div>
                </div>
                <div className="space-y-1">
                  <Button className="bg-red-500 w-full">BOOKING NOW</Button>
                  <a href="#" className="text-xs text-blue-400">
                    more Details →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
