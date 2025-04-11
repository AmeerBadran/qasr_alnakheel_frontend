/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoomById, getRoomById, getRoomPrice, updateRoomPricing, roomTypeData} from "../../api/endpoints/room";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import UpdateMainImage from "../../components/molecule/UpdateMainImage";
import { SpecialPriceModal } from '../../components/organism/SpecialPriceModal';

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const UpdateRoom = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [roomType, setRoomType] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainImageState, setMainImageState] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [secondaryImages2, setImagesecondry] = useState([]);
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
            console.log(room)
            const pricingData = pricingRes.data;
            const mainImage = room.RoomImages.find(image => image.main === true);
            setMainImageState(mainImage.id);
            setImageUrl(mainImage);
            const secondaryImages = room.RoomImages
                .filter(image => image.main === false)
                .map(image => image);

            setImagesecondry(secondaryImages);

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
                {Object.keys(formik.values).filter((key) =>key!=='isActive'&& key!=='id'&& key !== 'type' && key !== 'RoomPricings' && key !=='RoomImages').map((key) => (
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
            <UpdateMainImage isOpen={isModalOpen} secondaryImages={secondaryImages2} onClose={() => setIsModalOpen(false)} imageUrl={imageUrl} roomId={id} mainImageData={mainImageState} />
            <SpecialPriceModal isOpen={isSpecialPriceModalOpen} onClose={() => setIsSpecialPriceModalOpen(false)} roomId={id} />

        </div>
    );
};


const Input = ({ name, value, onChange }) => {
    const { i18n } = useTranslation();
    const lang = i18n.language || "ar"; // اللغة الحالية من i18next

    const [myValue, setMyValue] = useState("");

    useEffect(() => {
        if (typeof value === "object" && value !== null) {
            setMyValue(value[lang] || "");
        } else {
            setMyValue(value);
        }
    }, [value, lang]);

    const handleChange = (e) => {
        const newVal = e.target.value;
        setMyValue(newVal);

        if (typeof value === "object" && value !== null) {
            const updatedValue = { ...value, [lang]: newVal };
            onChange && onChange({ target: { name, value: updatedValue } });
        } else {
            onChange && onChange({ target: { name, value: newVal } });
        }
    };

    return (
        <div>
            <label className="block mb-1 text-white capitalize">{name}</label>
            <input
                type="text"
                name={name}
                value={myValue}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
        </div>
    );
};




export default UpdateRoom;