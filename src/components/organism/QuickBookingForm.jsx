/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { roomTypeData } from "../../api/endpoints/room";
import { createBookingByRoomType } from "../../api/endpoints/booking";
import { toast } from "react-toastify";

function QuickBookingForm({ locale }) {
  const [roomTypes, setRoomTypes] = useState([]);
  const { t } = useTranslation("home");

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await roomTypeData();
        setRoomTypes(response.data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  const formik = useFormik({
    initialValues: {
      type: "",
      adult_guests: "",
      child_guests: "",
      check_in_date: null,
      check_out_date: null,
    },
    validationSchema: Yup.object({
      type: Yup.string().required(t("booking.form.errors.roomTypeRequired")),
      check_in_date: Yup.date().required(
        t("booking.form.errors.check_in_required")
      ),
      check_out_date: Yup.date().required(
        t("booking.form.errors.check_out_required")
      ),
      adult_guests: Yup.number()
        .required(t("booking.form.errors.adult_guestsrequired"))
        .min(0),
      child_guests: Yup.number()
        .required(t("booking.form.errors.child_guestsrequired"))
        .min(0),
    }),
    onSubmit: async (values) => {
      const num_of_guests =
        parseInt(values.adult_guests) + parseInt(values.child_guests);

      const formData = new FormData();
      formData.append("type", values.type);
      formData.append("num_of_guests", num_of_guests.toString());
      formData.append(
        "check_in_date",
        values.check_in_date?.toISOString().split("T")[0] || ""
      );
      formData.append(
        "check_out_date",
        values.check_out_date?.toISOString().split("T")[0] || ""
      );
      formData.append("payment_status", "pending");

      await createBookingByRoomType(formData);
      toast.success(t("booking.form.success"));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex gap-4 rounded-full px-4 py-2 shadow-md items-center flex-wrap text-black bg-white"
    >
      {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
        <div className="w-full text-red-500">
          <p>{Object.values(formik.errors)[0]}</p>
        </div>
      )}

      <select
        name="type"
        onChange={formik.handleChange}
        value={formik.values.type}
        className="p-2 rounded bg-gray-200"
      >
        <option value="">{t("booking.form.selectRoomType")}</option>
        {roomTypes.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name[locale]}
          </option>
        ))}
      </select>

      <DatePicker
        selected={formik.values.check_in_date}
        onChange={(date) => formik.setFieldValue("check_in_date", date)}
        placeholderText={t("booking.form.checkIn")}
        className="p-2 rounded bg-gray-200"
        dateFormat="yyyy-MM-dd"
      />

      <DatePicker
        selected={formik.values.check_out_date}
        onChange={(date) => formik.setFieldValue("check_out_date", date)}
        placeholderText={t("booking.form.checkOut")}
        className="p-2 rounded bg-gray-200"
        dateFormat="yyyy-MM-dd"
      />

      <input
        type="number"
        name="adult_guests"
        placeholder={t("booking.form.adults")}
        onChange={formik.handleChange}
        value={formik.values.adult_guests}
        className="p-2 w-20 bg-gray-200"
      />

      <input
        type="number"
        name="child_guests"
        placeholder={t("booking.form.children")}
        onChange={formik.handleChange}
        value={formik.values.child_guests}
        className="p-2 w-20 bg-gray-200"
      />

      <button
        type="submit"
        className="bg-gray-800 hover:bg-gray-700 transition text-white py-2 px-4 rounded-full"
      >
        {t("booking.form.submit")}
      </button>
    </form>
  );
}

export default QuickBookingForm;
