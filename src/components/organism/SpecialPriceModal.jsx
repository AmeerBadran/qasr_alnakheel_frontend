/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { addSpecialPrice, getAllSpecialPrice, updateSpecialPrice } from "../../api/endpoints/room";
import { toast } from "react-toastify";

export const SpecialPriceModal = ({ isOpen, onClose, roomId }) => {
    const [specialPrices, setSpecialPrices] = useState([]);
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    const fetchSpecialPrices = async () => {
        try {
            const res = await getAllSpecialPrice();
            const filtered = res.data.filter(p => p.roomId === Number(roomId));
            setSpecialPrices(filtered);
        } catch (err) {
            toast.error(err?.response?.data?.message || "فشل في جلب الأسعار الخاصة");
        }
    };


    useEffect(() => {
        if (isOpen) {
            fetchSpecialPrices();
            setPrice('');
            setDate('');
            setUpdatingId(null);
        }
    }, [isOpen]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { roomId, price, date };
        try {
            if (updatingId) {
                await updateSpecialPrice(updatingId, payload);
                toast.success("تم تحديث السعر بنجاح");
            } else {
                await addSpecialPrice(payload);
                toast.success("تمت إضافة السعر بنجاح");
            }
            fetchSpecialPrices();
            setPrice('');
            setDate('');
            setUpdatingId(null);
        } catch (err) {
            toast.error(err?.response?.data?.message || "حدث خطأ أثناء الحفظ");
        }
    };

    const handleEdit = (price) => {
        setUpdatingId(price.id);
        setPrice(price.price);
        setDate(price.date);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl">
                <h2 className="text-xl font-bold mb-4 text-center">إدارة السعر الخاص</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded" required />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
                        {updatingId ? "تحديث" : "إضافة"}
                    </button>
                </form>
                <h3 className="mt-6 font-semibold">الأسعار الحالية</h3>
                <ul className="mt-2 max-h-40 overflow-y-auto space-y-2">
                    {specialPrices.map(p => (
                        <li key={p.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                            <span>{p.date}: {p.price} ₪</span>
                            <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">تعديل</button>
                        </li>
                    ))}
                </ul>
                <div className="text-right mt-4">
                    <button onClick={onClose} className="text-red-600 hover:underline">إغلاق</button>
                </div>
            </div>
        </div>
    );
};