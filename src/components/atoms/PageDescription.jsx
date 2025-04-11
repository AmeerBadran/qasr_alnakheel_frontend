/* eslint-disable react/prop-types */

export default function PageDescription({title,description}) {
  return (
    <div className="px-5 py-20 flex text-center text-white flex-col justify-center items-center gap-10 bg-my-color">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-2xl font-medium max-w-5xl">{description}</p>
    </div>
  );
}
