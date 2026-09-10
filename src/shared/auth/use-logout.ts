"use client";

import { useRouter } from "next/navigation";

import { authService } from "@/src/modules/Authentication/login/services/auth.service";
import { useAuthStore } from "./auth.store";
 

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // حتی اگر API logout خطا داد،
      // باید state سمت کلاینت پاک شود.
    } finally {
      useAuthStore
        .getState()
        .clearAuth();

      router.replace("/login");
    }
  };

  return {
    logout,
  };
};