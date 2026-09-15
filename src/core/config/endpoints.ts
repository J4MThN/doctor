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
    GET_BY_USER_ID: (userId: number) => `/Cycles/user/${userId}`,
    PREDICT_NEXT: "/Cycles/predict-next",
  },

  NOTES: {
    GET_ALL: "/Note",
    CREATE: "/Note",
    GET_BY_ID: (id: number) => `/Note/${id}`,
    UPDATE: (id: number) => `/Note/${id}`,
    DELETE: (id: number) => `/Note/${id}`,
    ADD_IMAGE: (id: number) => `/Note/${id}/images`,
    DELETE_IMAGE: (imageId: number) => `/Note/images/${imageId}`,
  },

  ARTICLES: {
    GET_ALL: "/Articles",
    GET_BY_ID: (id: number) => `/Articles/${id}`,
    CREATE: "/Articles",
    UPDATE: (id: number) => `/Articles/${id}`,
    DELETE: (id: number) => `/Articles/${id}`,
    ADD_IMAGE: (id: number) => `/Articles/${id}/image`,
  },

  CATEGORY_ARTICLES: {
    GET_ALL: "/CategoryArticles",
    GET_BY_ID: (id: number) => `/CategoryArticles/${id}`,
    CREATE: "/CategoryArticles",
    UPDATE: (id: number) => `/CategoryArticles/${id}`,
    DELETE: (id: number) => `/CategoryArticles/${id}`,
  },

  DAILY_SYMPTOMS: {
    GET_MINE: "/DailySymptoms/mine",
    GET_BY_CYCLE_ID: (cycleId: number) => `/DailySymptoms/cycle/${cycleId}`,
    CREATE: "/DailySymptoms",
  },

  COMMENTS: {
    GET_BY_ARTICLE_ID: (articleId: number) => `/Comments/article/${articleId}`,
    GET_PENDING: "/Comments/pending",
    CREATE: "/Comments",
    APPROVE: (id: number) => `/Comments/${id}/approve`,
    REJECT: (id: number) => `/Comments/${id}/reject`,
    DELETE: (id: number) => `/Comments/${id}`,
  },

  QUESTIONS: {
    GET_ALL: "/Questions",
    GET_BY_ID: (id: number) => `/Questions/${id}`,
  },

  PREGNANCIES: {
    GET_MINE: "/Pregnancies/mine",
  },
};
