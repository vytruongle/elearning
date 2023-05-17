import axios from "axios";
import { message } from "../module/MessageToastify";

const TokenCyberSoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3NCIsIkhldEhhblN0cmluZyI6IjE2LzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDgyMjQwMDAwMCIsIm5iZiI6MTY2ODI3MjQwMCwiZXhwIjoxNjk0OTcwMDAwfQ.3TXoqM7cOKUQgRGc0plbpUsV406snlZBBeHlA7RxJYk";

const baseURL = "https://elearningnew.cybersoft.edu.vn/api";

const user = JSON.parse(localStorage.getItem("userAccount"));
const accessToken = user ? user.accessToken : "";

const http = axios.create();

http.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      TokenCyberSoft,
      Authorization: `Bearer ${accessToken}`,
    },
    baseURL,
  };
});

http.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error?.response?.status === 403) {
      return message.error("Bạn không có quyền try cập");
    }

    if (error?.response?.status === 400) {
      return message.error(error?.data?.content.message);
    }

    if (error?.response?.status === 404) {
      console.log(error);
      return message.error(error);
    }

    if (error?.response?.status === 500) {
      console.log(error);
      // return message.error(error?.response?.data);
    }
  }
);

export default http;

export const httpErrorCode = {
  403: "",
};

export const messErr = {
  403: "Bạn không có quyền truy cập",
};
