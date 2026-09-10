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

  CYCLES: {
    GET_MINE: "/Cycles/mine",
    GET_ALL: "/Cycles",
    PREDICT_NEXT: "/Cycles/predict-next",
  },

  NOTES: {
    GET_ALL: "/Notes",
    CREATE: "/Notes",
    GET_BY_ID: (id: number) => `/Notes/${id}`,
    UPDATE: (id: number) => `/Notes/${id}`,
    DELETE: (id: number) => `/Notes/${id}`,
    ADD_IMAGE: (id: number) => `/Notes/${id}/images`,
    DELETE_IMAGE: (imageId: number) => `/Notes/images/${imageId}`,
  },
};
