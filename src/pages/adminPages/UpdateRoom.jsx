/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoomById, getRoomById, getRoomPrice, updateRoomPricing, roomTypeData, getAllSpecialPrice, addSpecialPrice, updateSpecialPrice } from "../../api/endpoints/room";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import UpdateMainImage from "../../components/molecule/UpdateMainImage";

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const UpdateRoom = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [roomType, setRoomType] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainImageState, setMainImageState] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isSpecialPriceModalOpen, setIsSpecialPriceModalOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            room_no: '', type: '', capacity: '', room_length: '',
            num_of_baths: '', adult_guests: '', child_guests: '',
            category_ar: '', category_en: '', bed_type_ar: '', bed_type_en: '',
            pricing: weekDays.map(day => ({ day, price: 0, id: null })),
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const pricingPayload = {
                pricing: values.pricing.map(item => ({ day: item.day, price: Number(item.price) }))
            };
            await Promise.all([
                updateRoomById(id, values),
                updateRoomPricing(id, pricingPayload)
            ]);
            toast.success('Room data updated successfully!');
        },
    });

    useEffect(() => {
        async function fetchData() {
            const [roomTypeRes, roomRes, pricingRes] = await Promise.all([
                roomTypeData(), getRoomById(id), getRoomPrice(id)
            ]);

            setRoomType(roomTypeRes.data);
            const room = roomRes?.data?.room;
            const pricingData = pricingRes.data;
            const mainImage = room.RoomImages.find(image => image.main === true);
            setMainImageState(mainImage.id);
            setImageUrl(`https://qasr-alnakheel.onrender.com/uploads/roomImages/${mainImage.image_name_url}`);

            if (room) {
                const formattedPricing = weekDays.map(day => {
                    const matched = pricingData.find(p => p.day_of_week.toLowerCase() === day);
                    return { day, price: matched ? Number(matched.price) : 0, id: matched?.id || null };
                });

                formik.setValues({ ...room, category_ar: room.category?.ar || '', category_en: room.category?.en || '', bed_type_ar: room.bed_type?.ar || '', bed_type_en: room.bed_type?.en || '', pricing: formattedPricing });
            } else toast.error("Room not found");
        }
        fetchData();
    }, [id]);

    const handlePriceChange = (index, value) => {
        const newPricing = [...formik.values.pricing];
        newPricing[index].price = value === '' ? '' : Number(value);
        formik.setFieldValue('pricing', newPricing);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Update Room</h2>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 text-white capitalize">{t('add_room.room_type')}</label>
                    <select name="type" className="p-2 rounded bg-gray-700 w-full text-white" onChange={formik.handleChange} value={formik.values.type}>
                        <option value="">{t('add_room.select_default')}</option>
                        {roomType.map((type) => (
                            <option key={type.id} value={type.id}>{type.name[i18n.language] || type.name.en}</option>
                        ))}
                    </select>
                </div>
                {Object.keys(formik.values).filter((key) => key !== 'type' && key !== 'pricing').map((key) => (
                    <Input key={key} name={key} value={formik.values[key]} onChange={formik.handleChange} />
                ))}
                <div className="col-span-full">
                    <h3 className="text-xl font-semibold text-white mb-2">Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {formik.values.pricing.map((dayData, index) => (
                            <div key={dayData.day} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">{t(`days.${dayData.day}`)}</label>
                                <input type="number" value={dayData.price} onChange={(e) => handlePriceChange(index, e.target.value)} className="w-full p-2 border border-gray-300 rounded" min="1" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-full flex gap-4">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">{t('actions.update') || 'Update'}</button>
                </div>
                <div className="col-span-full mt-6 text-center">
                    <button type="button" onClick={() => setIsModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                        {t('actions.updateMainImage') || 'Update Main Image'}
                    </button>
                </div>
                <div className="col-span-full text-center">
                    <button type="button" onClick={() => setIsSpecialPriceModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">
                        إدارة السعر الخاص
                    </button>
                </div>
            </form>
            <UpdateMainImage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageUrl={imageUrl} roomId={mainImageState} />
            <SpecialPriceModal isOpen={isSpecialPriceModalOpen} onClose={() => setIsSpecialPriceModalOpen(false)} roomId={id} />
        </div>
    );
};

const Input = ({ name, value, onChange }) => (
    <div>
        <label className="block mb-1 text-white capitalize">{name}</label>
        <input type="text" name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" />
    </div>
);

const SpecialPriceModal = ({ isOpen, onClose, roomId }) => {
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

export default UpdateRoom;