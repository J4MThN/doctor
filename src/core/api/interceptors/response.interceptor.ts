

import { axiosInstance } from "../axiosInstance";
import { handleError } from "../error";

export const setupResponseInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => handleError(error)
  );
};