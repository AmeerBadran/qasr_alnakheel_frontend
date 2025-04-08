import axiosInstance from "../axios";

export const dashboardData = () => {
  return axiosInstance.get('/general/');
}