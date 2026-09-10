import { useAuthStore } from "@/src/shared/auth/auth.store";

 

export const getToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

export const setToken = (token: string | null): void => {
  if (!token) {
    useAuthStore.getState().clearAuth();
    return;
  }

  useAuthStore.getState().setAccessToken(token);
};

export const removeToken = (): void => {
  useAuthStore.getState().clearAuth();
};