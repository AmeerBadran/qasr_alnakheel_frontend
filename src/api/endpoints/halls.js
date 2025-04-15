import axiosInstance from "../axios";
export const getAllHalls = (hallsData) => {
    return axiosInstance.get("/halls", hallsData);

}