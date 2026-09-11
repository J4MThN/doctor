import { refreshToken } from "@/src/core/api/refresh/refresh.manager";
import { userService } from "@/src/modules/Authentication/login/services/user.service";
import { useAuthStore } from "./auth.store";

export const bootstrapAuth = async (): Promise<void> => {
  const store = useAuthStore.getState();

  if (store.isInitialized) {
    return;
  }

  try {
    const newAccessToken = await refreshToken();

    store.setAuth(newAccessToken);

    const profile = await userService.getMe();
    store.setProfile(profile);
  } catch {
    // کاربر لاگین نیست یا توکن نداره - این حالت طبیعیه، نیازی به لاگ خطا نیست
    store.clearAuth();
  } finally {
    store.setInitialized(true);
  }
};