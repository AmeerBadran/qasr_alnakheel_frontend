
import { Link } from 'react-router-dom';
import background from "../../assets/images/bestImage.jpg";
import hallImg from "../../assets/images/Outdoor seating.jpeg";
import poolImg from "../../assets/images/de1.jpeg";
import restaurantImg from "../../assets/images/de3.jpeg";
import { useTranslation } from 'react-i18next';

export default function FacilitiesSection() {
    const { t } = useTranslation("home");
  return (
    <div className="relative flex py-20 pb-40 overflow-hidden mt-20 bg-black">
      <img
        src={background}
        className="absolute h-full w-full object-cover -mt-20"
        alt="خلفية"
      />
      <div className="absolute bg-black/80 h-full w-full -mt-20 z-10"></div>

      <div className="relative z-20 max-w-[1300px] mx-auto px-4 mb-28">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white w-full py-5 mb-16">
          {t("home.facilitiesSection.title")}
        </h2>

        <div className="grid grid-cols-1 slg:grid-cols-3 gap-8 px-6 h-full text-white">
          {/* الصورة الكبيرة على اليسار */}
          <Link to="/halls" className="slg:col-span-1 h-full">
            <div className="relative group h-full overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition">
              <img
                src={hallImg}
                alt={t("home.facilitiesSection.hall.title")}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h3 className="text-lg font-semibold">
                  {t("home.facilitiesSection.hall.title")}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {t("home.facilitiesSection.hall.description")}
                </p>
              </div>
            </div>
          </Link>

          {/* بطاقتين مكدستين على اليمين */}
          <div className="slg:col-span-2 flex flex-col gap-8 h-full">
            {/* البطاقة الأولى */}
            <Link
              to="/restaurant"
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition h-1/2"
            >
              <img
                src={restaurantImg}
                alt={t("home.facilitiesSection.restaurant.title")}
                className="h-[260px] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h3 className="text-lg font-semibold">
                  {t("home.facilitiesSection.restaurant.title")}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {t("home.facilitiesSection.restaurant.description")}
                </p>
              </div>
            </Link>

            {/* البطاقة الثانية */}
            <Link
              to="/pool"
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition h-1/2"
            >
              <img
                src={poolImg}
                alt={t("home.facilitiesSection.pool.title")}
                className="h-[260px] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                <h3 className="text-lg font-semibold">
                  {t("home.facilitiesSection.pool.title")}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {t("home.facilitiesSection.pool.description")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
