/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function UpperTitle({
  title,
  description,
  withDesc,
  imgSrc,
  to = "rooms",
  bottonLabel = "Book Now",
}) {
  return (
    <div className=" relative flex justify-center items-center h-[550px] w-full">
      <img
        src={imgSrc}
        alt={title}
        className=" absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className=" absolute top-0 left-0 w-full h-full bg-black/60"></div>
      <div className="flex flex-col justify-center items-center gap-8 text-white text-center z-20 px-5">
        <h1 className="text-2xl md:text-4xl slg:text-5xl font-bold max-w-4xl">
          {title}
        </h1>
        {withDesc && (
          <>
            <p className="text-base md:text-xl font-medium text-gray-200 max-w-3xl">
              {description}
            </p>
            <Link
              to={`/${to}`}
              type="button"
              className="px-7 py-2 bg-sec-color-100 rounded-md text-lg font-semibold hover:bg-sec-color-200 mt-10 text-black shadow-sm hover:shadow-sm border border-black hover:shadow-black"
            >
              {bottonLabel}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
