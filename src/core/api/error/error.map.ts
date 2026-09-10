
import type { AxiosError } from "axios";
import { ApiErrorResponse, AppError } from "./error.types";
 

const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    (typeof (data as { message?: unknown }).message === "string" ||
      typeof (data as { message?: unknown }).message === "undefined")
  );
};

export const mapAxiosErrorToAppError = (
  error: AxiosError<unknown>
): AppError => {
  if (!error.response) {
    return {
      code: "NETWORK_ERROR",
      message: "مشکل در اتصال به سرور",
      status: null,
    };
  }

  const { status, data } = error.response;

  const apiData: ApiErrorResponse | null = isApiErrorResponse(data)
    ? data
    : null;

  const message = apiData?.message;

  switch (status) {
    case 400:
      return {
        code: "BAD_REQUEST",
        message: message || "درخواست نامعتبر است",
        status,
      };

    case 401:
      return {
        code: "UNAUTHORIZED",
        message: message || "لطفاً دوباره وارد حساب شوید",
        status,
      };

    case 403:
      return {
        code: "FORBIDDEN",
        message: message || "شما دسترسی لازم را ندارید",
        status,
      };

    case 404:
      return {
        code: "NOT_FOUND",
        message: message || "اطلاعات موردنظر یافت نشد",
        status,
      };

    case 409:
      return {
        code: "CONFLICT",
        message: message || "این اطلاعات قبلاً ثبت شده است",
        status,
      };

    case 423:
      return {
        code: "LOCKED",
        message: message || "حساب شما موقتاً قفل شده است",
        status,
      };

    case 429:
      return {
        code: "TOO_MANY_REQUESTS",
        message: message || "تعداد درخواست‌ها بیش از حد مجاز است",
        status,
      };

    case 500:
      return {
        code: "SERVER_ERROR",
        message: message || "خطایی در سرور رخ داده است",
        status,
      };

    default:
      return {
        code: "UNKNOWN",
        message: message || "خطای غیرمنتظره‌ای رخ داده است",
        status,
      };
  }
};