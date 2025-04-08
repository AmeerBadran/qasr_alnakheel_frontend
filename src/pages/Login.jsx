/* eslint-disable react/jsx-no-duplicate-props */
import { useFormik } from "formik";
import * as Yup from "yup";
import { logIn } from "../api/endpoints/auth";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { saveAuthData } from "../features/authData/authDataSlice";
import { Link } from "react-router-dom";
import imagename from "../assets/images/background.png";
import imageIcon from "../assets/images/google.png";
import imageLogo from "../assets/images/facebook.png";
import imagelogo from "../assets/images/logo.png";




export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await logIn(values);
        setLoading(false);
        toast.success(
          `Welcome ${response.data.user.first_name} ${response.data.user.last_name}`
        );
        dispatch(
          saveAuthData({
            userId: response.data.user.id,
            userData: response.data.user,
            userRole: response.data.user.role,
          })
        );
        navigate("/");
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="relative h-screen w-full">
       <img src={imagename} alt="Background" className="absolute inset-0 w-full h-full object-cover"/>
       <div className="bg-black bg-opacity-40 absolute inset-0 w-full h-full object-cover"src={imagename} alt="Background"  ></div>
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" >
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 bg-opacity-0">
        <img src={imagelogo} alt="logo" className="max-auto" />
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Login with your account
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              onChange={formik.handleChange}
              checked={formik.values.rememberMe}
              className="mr-2"
            />
            <label className="text-white">
              Remember me
            </label>
            <a href="/forgot-password" className="text-red-500 ml-auto">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {loading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              "Login"
            )}
          </button>
          <div className="text-center mt-4">
            <span className="text-white">Or login with</span>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-red-600  py-2 px-4 rounded w-1/2 hover:bg-red-800">
              <img src={imageLogo} alt="Login with Facebook" className="w-6 h-6 mx-auto" />
              </button>
              <button className="bg-red-600 py-2 px-4 rounded w-1/2 hover:bg-red-800">
              <img src={imageIcon } alt="Login with Google" className="w-6 h-6 mx-auto" />
              </button>
            </div>
          </div>
          <p className="text-center text-white mt-4">
            Already have an account?{' '}
            <Link to="/signup" className="text-red-500 hover:underline"> Sign In Now </Link>

          </p>
        </form>
      </div>
    </div>
 </div>
    
  );
}