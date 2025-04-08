import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateRoomById, getRoomById, getRoomPrice, updateRoomPricing, roomTypeData } from "../../api/endpoints/room";
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

const weekDays = [
    'sunday', 'monday', 'tuesday', 'wednesday',
    'thursday', 'friday', 'saturday'
];

const UpdateRoom = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [roomType, setRoomType] = useState([]);

    const formik = useFormik({
        initialValues: {
            room_no: '',
            type: '',
            capacity: '',
            room_length: '',
            num_of_baths: '',
            adult_guests: '',
            child_guests: '',
            category_ar: '',
            category_en: '',
            bed_type_ar: '',
            bed_type_en: '',
            pricing: weekDays.map(day => ({ day, price: 0, id: null }))
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
                const { ...roomData } = values;
                const pricingPayload ={
                    pricing: values.pricing.map(item => ({
                      day: item.day,
                      price: Number(item.price)
                    }))
                  };
                await Promise.all([
                    updateRoomById(id, roomData),
                    updateRoomPricing(id,pricingPayload)
                ]);

                toast.success('Room data updated successfully!');
        },
    });

    useEffect(() => {
        async function fetchData() {
                const [roomTypeRes, roomRes, pricingRes] = await Promise.all([
                    roomTypeData(),
                    getRoomById(id),
                    getRoomPrice(id)
                ]);

                setRoomType(roomTypeRes.data);
                const room = roomRes?.data?.room;
                const pricingData = pricingRes.data;

                if (room) {
                    const formattedPricing = weekDays.map(day => {
                        const matched = pricingData.find(p => p.day_of_week.toLowerCase() === day);
                        return {
                            day,
                            price: matched ? Number(matched.price) : 0,
                            id: matched?.id || null
                        };
                    });

                    formik.setValues({
                        room_no: room.room_no || '',
                        type: room.type || '',
                        capacity: room.capacity || '',
                        room_length: room.room_length || '',
                        num_of_baths: room.num_of_baths || '',
                        adult_guests: room.adult_guests || '',
                        child_guests: room.child_guests || '',
                        category_ar: room.category?.ar || '',
                        category_en: room.category?.en || '',
                        bed_type_ar: room.bed_type?.ar || '',
                        bed_type_en: room.bed_type?.en || '',
                        pricing: formattedPricing
                    });
                } else {
                    toast.error("Room not found");
                }
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
                    <select
                        name="type"
                        className="p-2 rounded bg-gray-700 w-full text-white"
                        onChange={formik.handleChange}
                        value={formik.values.type}
                    >
                        <option value="">{t('add_room.select_default')}</option>
                        {roomType.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name[i18n.language] || type.name.en}
                            </option>
                        ))}
                    </select>
                </div>

                {Object.keys(formik.values)
                    .filter((key) => key !== 'type' && key !== 'pricing')
                    .map((key) => (
                        <Input
                            key={key}
                            name={key}
                            value={formik.values[key]}
                            onChange={formik.handleChange}
                        />
                    ))}

                <div className="col-span-full">
                    <h3 className="text-xl font-semibold text-white mb-2">Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {formik.values.pricing.map((dayData, index) => (
                            <div key={dayData.day} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                                    {t(`days.${dayData.day}`)}
                                </label>
                                <input
                                    type="number"
                                    value={dayData.price}
                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    min="1"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-full flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
                    >
                        {t('actions.update') || 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const Input = ({ name, value, onChange }) => (
    <div>
        <label className="block mb-1 text-white capitalize">{name}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border rounded"
        />
    </div>
);

export default UpdateRoom;