import { refreshAccessToken } from "@/src/core/api/refresh/refresh.service";

 
import { userService } from "@/src/modules/Authentication/login/services/user.service";
import { useAuthStore } from "./auth.store";

 

export const bootstrapAuth = async (): Promise<void> => {
  const store = useAuthStore.getState();

  if (store.isInitialized) {
    return;
  }

  try {
    const response =
      await refreshAccessToken();

    store.setAuth(response.accessToken);

    const profile =
      await userService.getMe();

    store.setProfile(profile);
  } catch {
    store.clearAuth();
  } finally {
    store.setInitialized(true);
  }
};