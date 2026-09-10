 
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "../services/auth.service";
import { useAuthStore } from "@/src/shared/auth/auth.store";
import { AppError } from "@/src/core/api/error";
import { setAccessToken } from "@/src/core/auth/token.provider";
import { userService } from "../services/user.service";

export const useLogin = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const login = async (
    mobile: string,
    pin: string
  ): Promise<boolean> => {
    if (isLoading) {
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Login
      const response = await authService.login({
        mobile,
        pin,
      });

      // 2. Store access token in memory
      setAccessToken(response.accessToken);

      // 3. Get current user profile
      const profile = await userService.getMe();

      // 4. Store profile
      useAuthStore.getState().setProfile(profile);

      // 5. Go to admin
      router.replace("/admin");

      return true;
    } catch (error) {
      // If login/profile fails, clear auth state
      useAuthStore.getState().clearAuth();

      setError(error as AppError);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
 
