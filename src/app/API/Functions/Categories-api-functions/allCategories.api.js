import axiosInstance from "../../Instance/axiosInstance";
import END_POINTS from "../../End_points";

export const getAllCategories = async () => {
  const response = await axiosInstance.get(END_POINTS.GET_ALL_CATEGORIES);
  return response.data;
};
