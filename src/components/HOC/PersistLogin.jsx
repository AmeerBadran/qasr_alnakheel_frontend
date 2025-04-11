import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAuthData } from "../../features/authData/authDataSlice";
import ReactLoading from "react-loading";
import { getUserData } from "../../api/endpoints/auth";
import { useNavigate } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function PersistLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function refreshUserData() {
      try {
        const response = await getUserData();
        dispatch(
          saveAuthData({
            userData: response.data.user,
          })
        );
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    refreshUserData();
  }, [dispatch, navigate]);

  return loading ? (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50">
      <ReactLoading type="spin" color="black" height={200} width={110} />
    </div>
  ) : (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
