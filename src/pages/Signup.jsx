/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../api/endpoints/auth";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch ,  useSelector} from "react-redux";
import { useState } from "react";
import { saveAuthData } from "../features/authData/authDataSlice";
import { Link } from "react-router-dom";
import imagename from "../assets/images/background.png";
import imageIcon from "../assets/images/google.png";
import imageLogo from "../assets/images/facebook.png";
import imagelogo from "../assets/images/logo.png";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.authData);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobileNo: [""],
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      postal_code: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      mobileNo: Yup.array().of(Yup.string().required("Required")),
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      password: Yup.string().min(6, "At least 6 characters").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      birthdate: Yup.date().required("Required"),
      postal_code: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await signUp(values);
        dispatch(saveAuthData(response.data));
        setLoading(false);
        toast.success("Account created successfully!");
        navigate("/login");
      } catch (error) {
        setLoading(false);
        toast.error("Sign up failed. Please try again.");
      }
    },
  });

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
      <img src={imagename} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
      <div className="relative bg-white bg-opacity-0 p-8 rounded-xl shadow-lg w-[450px]">
        <img src={imagelogo} alt="Logo" className="mx-auto" />
        <h2 className="text-2xl font-bold text-center text-white mb-6">Create your account</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
            type="text" 
            name="first_name" 
            placeholder="First Name" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.first_name} 
            className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
            />
            <input 
            type="text" 
            name="last_name" 
            placeholder="Last Name" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.last_name} 
            className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
            />
          </div>
          <input 
          type="date" 
          name="birthdate" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.birthdate} 
          className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
          />
          <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.email} 
          className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
          />
          <input 
          type="text" 
          name="mobileNo[0]"
          placeholder="Phone Number" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.mobileNo[0]} 
          className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
            type="text" 
            name="country" 
            placeholder="Country" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.country} 
            className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
            />
            <input 
            type="text" 
            name="city" 
            placeholder="City" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.city} 
            className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
            />
          </div>
          <input 
          type="text" 
          name="postal_code" 
          placeholder="Postal Code (Optional)" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.postal_code} 
          className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
          />
          <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.password} 
          className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
          />
          <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.confirmPassword} 
          className="w-full p-3 bg-white text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" 
          />
          <button type="submit" className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300" disabled={loading || !formik.isValid || formik.isSubmitting}>{loading ? <ReactLoading type="spin" color="#fff" height={20} width={20} /> : "Sign Up"}</button>
          {user && ( // يظهر الزر فقط إذا كان المستخدم مسجلاً
            <button
              onClick={() => navigate("/home")}
              className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Go to Home
            </button>
          )}
          <div className="text-center mt-4">
            <span className="text-white">Or login with</span>
            <div className="flex justify-center gap-4 mt-2">
              <button className="bg-red-600 py-2 px-4 rounded w-1/2 hover:bg-red-800">
                <img src={imageLogo} alt="Login with Facebook" className="w-6 h-6 mx-auto" />
              </button>
              <button className="bg-red-600 py-2 px-4 rounded w-1/2 hover:bg-red-800">
                <img src={imageIcon} alt="Login with Google" className="w-6 h-6 mx-auto" />
              </button>
            </div>
          </div>
          <p className="text-center text-white mt-4">Already have an account? <Link to="/login" className="text-red-500 hover:underline"> Sign In Now </Link></p>
        </form>
      </div>
    </div>
  );
}
