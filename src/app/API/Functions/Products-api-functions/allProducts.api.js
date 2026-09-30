import axiosInstance from "../../Instance/axiosInstance";
import END_POINTS from "../../End_points";

export const getBeautyProducts = async () => {
  const response = await axiosInstance.get(END_POINTS.productEnd.Beauty);
  return response.data;
};

export const getFragranceProducts = async () => {
  const response = await axiosInstance.get(END_POINTS.productEnd.Fragnance);
  return response.data;
};

export const getMensProducts = async () => {
  const response = await axiosInstance.get(END_POINTS.productEnd.Mens);
  return response.data;
};

export const getWomensProducts = async () => {
  const response = await axiosInstance.get(END_POINTS.productEnd.Womans);
  return response.data;
};
