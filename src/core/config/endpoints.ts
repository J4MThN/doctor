export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    FORGOT_PIN: "/auth/forgot-pin",
  },

  USERS: {
    ME: "/users/me",
    GET_ALL: "/users",
    GET_BY_ID: (id: number) => `/users/${id}`,
    UPDATE_ME: "/users/me",
    DELETE: (id: number) => `/users/${id}`,
  },
};