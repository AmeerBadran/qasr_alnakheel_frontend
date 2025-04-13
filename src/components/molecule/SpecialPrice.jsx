/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllSpecialPrice, addSpecialPrice, updateSpecialPrice } from "../../api/endpoints/room";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const SpecialPrice = ({ isOpen, onClose }) => {
  const [specialPrices, setSpecialPrices] = useState([]);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    try {
      const res = await getAllSpecialPrice();
      setSpecialPrices(res.data);
    } catch (err) {
      toast.error("فشل في جلب الأسعار الخاصة.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPrices();
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      day: '',
      price: '',
      roomId: ''
    },
    validationSchema: Yup.object({
      day: Yup.string().required("اليوم مطلوب"),
      price: Yup.number().required("السعر مطلوب").positive("السعر يجب أن يكون موجب"),
      roomId: Yup.string().required("رقم الغرفة مطلوب"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (editingPriceId) {
          await updateSpecialPrice(editingPriceId, values);
          toast.success("تم تحديث السعر بنجاح");
        } else {
          await addSpecialPrice(values);
          toast.success("تم إضافة السعر بنجاح");
        }

        fetchPrices();
        resetForm();
        setEditingPriceId(null);
      } catch (err) {
        toast.error("حدث خطأ أثناء حفظ البيانات");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleEdit = (price) => {
    setEditingPriceId(price._id);
    formik.setValues({
      day: price.day,
      price: price.price,
      roomId: price.roomId,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{editingPriceId ? "تعديل السعر الخاص" : "إضافة سعر خاص"}</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-xl">×</button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">اليوم</label>
            <input
              type="text"
              name="day"
              value={formik.values.day}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.day && formik.errors.day && (
              <p className="text-red-500 text-sm">{formik.errors.day}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">السعر</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">رقم الغرفة</label>
            <input
              type="text"
              name="roomId"
              value={formik.values.roomId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded"
            />
            {formik.touched.roomId && formik.errors.roomId && (
              <p className="text-red-500 text-sm">{formik.errors.roomId}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "جارٍ الحفظ..." : editingPriceId ? "تحديث" : "إضافة"}
          </button>
        </form>

        {/* قائمة الأسعار الخاصة */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">كل الأسعار الخاصة:</h3>
          <ul className="space-y-2">
            {specialPrices.map((price) => (
              <li key={price._id} className="bg-gray-100 p-3 rounded flex justify-between items-center">
                <div>
                  <p><strong>اليوم:</strong> {price.day}</p>
                  <p><strong>السعر:</strong> {price.price}</p>
                  <p><strong>Room ID:</strong> {price.roomId}</p>
                </div>
                <button
                  onClick={() => handleEdit(price)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  تعديل
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecialPrice;
