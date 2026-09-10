
import axios from "axios";

import { ENV } from "@/src/core/config";

export const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});