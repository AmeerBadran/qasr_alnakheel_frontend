import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AuthButton = ({ label, icon: Icon, roundedPosition, to }) => {
  const roundedClass =
    roundedPosition === "left"
      ? "rounded-l-lg"
      : roundedPosition === "right"
        ? "rounded-r-lg"
        : "rounded-lg";

  return (
    <Link
      to={to}
      className={`group flex gap-5 items-center px-3 py-3 bg-white text-my-color hover:text-white font-semibold ${roundedClass} relative duration-300 `}
    >
      <div
        className={`absolute bg-sec-color w-0 h-full ${roundedClass} ${roundedPosition === "left" ? "right-0" : "left-0"} 
        group-hover:w-full opacity-0 group-hover:opacity-100 transition-all duration-500`}
      ></div>
      <p className="z-10 font-bold">{label}</p>
      <Icon className="w-5 h-5 min-w-5 min-h-5 z-10" />
    </Link>
  );
};

export default AuthButton;
