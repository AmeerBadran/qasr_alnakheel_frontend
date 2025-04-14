/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const ImageCarousel = ({ images }) => {
  const { t, i18n } = useTranslation("home");
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1124 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1124, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mx-auto h-[350px] py-8 max-w-[1300px]">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        itemClass="px-4"
        partialVisible
      >
        {images.map((src, index) => {
          const today = new Date()
            .toLocaleDateString("en-US", { weekday: "long" })
            .toLowerCase();

          const specialPrice = src.room.SpecialPricings?.find(
            (sp) => sp.day_of_week.toLowerCase() === today
          );

          const normalPrice = src.room.RoomPricings?.find(
            (rp) => rp.day_of_week.toLowerCase() === today
          );

          const price = specialPrice ? specialPrice.price : normalPrice?.price;
          const isSpecial = !!specialPrice;
          return (
            <div key={src.id}>
              <div className="relative w-full h-[350px] rounded overflow-hidden group border shadow-lg shadow-gray-700 my-4">
                <div className=" absolute bottom-0 w-full h-0 group-hover:h-96 transition-all duration-300 ease-out bg-my-color/60 z-10 border-t-1 overflow-hidden">
                  <div className="flex flex-col justify-center items-center h-full text-white p-4">
                    <h2 className="text-3xl font-bold">
                      {src.name[i18n.language || src.name.en]}
                    </h2>
                    <p className="mt-2 text-center h-28 overflow-y-auto text-sm font-medium">
                      {src.description[i18n.language || src.description.en]}
                    </p>
                    <p className="mt-4 bg-green-800 p-2 rounded-md">
                      {price} NIS{" "}
                      {isSpecial && (
                        <span className="text-yellow-400">
                          (سعر خاص لوقت محدود)
                        </span>
                      )}
                    </p>
                    <Link
                      to={`/rooms/${src.room.id}`}
                      className="mt-4 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-sec-color-200 transition duration-200"
                    >
                      {t("home.ImageCarousel.button")}
                    </Link>
                  </div>
                </div>
                <img
                  src={src.room.RoomImages[0].image_name_url}
                  alt={`Slide ${index + 1}`}
                  className="rounded shadow-lg w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
