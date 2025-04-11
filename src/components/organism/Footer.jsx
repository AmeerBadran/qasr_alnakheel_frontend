import { Link } from "react-router-dom";
import mainLogo from "../../assets/images/logo.png";
export default function Footer() {
  return (
    <div>
      <footer className="bg-third-color py-10 text-white bg-my-color">
        <div className="max-w-[1300px] mx-auto px-4 flex justify-between flex-col 2md:flex-row text-left">
          <div className="2md:w-3/5 mb-6 pr-12 md:mb-0">
            <Link to="/">
              <img
                src={mainLogo}
                alt="Clinic Office System Logo"
                className="mb-4 max-w-64 w-auto"
              />
            </Link>
            <p>We care about your growth!</p>
            <p className="mt-2">
              Enroll in our advanced courses and acquire new skills through our
              premium learning platform. Whether you are looking to enhance your
              career or explore new hobbies, we offer a variety of courses
              tailored to your needs. Do not miss out—sign up now and take the
              next step in your personal and professional development!
            </p>
          </div>
          <div className="2md:w-1/5 mb-6 md:mb-0 mt-5">
            <h3 className=" font-semibold mb-3">Website Pages</h3>
            <ul className="flex flex-col flex-1 gap-4 justify-start items-start w-full">
              {/* <NavLinks linksLayout={"halfPage"} bgColor={"footer"} /> */}
            </ul>
          </div>
          <div className="2md:w-1/5 mb-6 md:mb-0 mt-5">
            <h3 className="font-semibold mb-3">Social Media</h3>
            {/* <SocialLinks /> */}
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p>Clinic Office System 2024 © All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
