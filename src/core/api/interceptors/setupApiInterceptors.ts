import { setupRequestInterceptor } from "./request.interceptor";
import { setupRefreshTokenInterceptor } from "./refreshToken.interceptor";
import { setupResponseInterceptor } from "./response.interceptor";

let initialized = false;

export const setupApiInterceptors = (): void => {
  if (initialized) return;

  initialized = true;

  setupRequestInterceptor();
  setupRefreshTokenInterceptor();
  setupResponseInterceptor();
};