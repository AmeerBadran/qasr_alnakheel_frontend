import axiosInstance from "../axios";

export const getRoomsAndSuites = () => {
    return axiosInstance.get('/room/get/availableRoomPerType');
}