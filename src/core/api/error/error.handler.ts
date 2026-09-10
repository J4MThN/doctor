
import type { AxiosError } from "axios";
import { mapAxiosErrorToAppError } from "./error.map";

export const handleError = (error: AxiosError<unknown>) => {
  const appError = mapAxiosErrorToAppError(error);

  return Promise.reject(appError);
};