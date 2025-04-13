import axiosInstance from "../axios";
import { store } from '../../app/store';
export const createBookingByRoomType = (formData) => {
    const state = store.getState();
    const id = state.authData?.userId;
    return axiosInstance.post(`/booking/${id}`, formData);
}