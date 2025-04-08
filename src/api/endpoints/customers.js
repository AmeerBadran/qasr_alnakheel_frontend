import axiosInstance from "../axios";
import { store } from '../../app/store';
export const getCustomerData = () => {
  const state = store.getState();
  const id = state.authData?.userId;
  return axiosInstance.get(`/get/any/${id}`);
}