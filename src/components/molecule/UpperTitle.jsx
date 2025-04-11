/* eslint-disable react/prop-types */
export default function UpperTitle({ title, description, withDesc, imgSrc }) {
  return (
    <div className=" relative flex justify-center items-center h-[550px] w-full">
      <img
        src={imgSrc}
        alt={title}
        className=" absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className=" absolute top-0 left-0 w-full h-full bg-black/60"></div>
      <div className="flex flex-col justify-center items-center gap-8 text-white text-center z-20 px-5">
        <h1 className="text-2xl md:text-4xl slg:text-5xl font-bold max-w-4xl">{title}</h1>
        {withDesc && (
          <>
            <p className="text-base md:text-xl font-medium text-gray-200 max-w-3xl">
              {description}
            </p>
            <button
              type="button"
              className="px-7 py-2 bg-white/20 text-lg font-medium hover:bg-white/30"
            >
              Explor
            </button>
          </>
        )}
      </div>
    </div>
  );
}
