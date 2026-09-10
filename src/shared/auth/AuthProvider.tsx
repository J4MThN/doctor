"use client";

import { useEffect } from "react";

import { bootstrapAuth } from "@/src/shared/auth/auth.bootstrap";
import { useAuthStore } from "@/src/shared/auth/auth.store";

import { configureTokenProvider } from "@/src/core/auth/token.provider";
import { setupApiInterceptors } from "@/src/core/api/interceptors/setupApiInterceptors";
 

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    configureTokenProvider({
      getAccessToken: () => {
        return useAuthStore.getState().accessToken;
      },

      setAccessToken: (token: string | null) => {
        if (token) {
          useAuthStore.getState().setAccessToken(token);
        } else {
          useAuthStore.getState().clearAuth();
        }
      },

      clearAccessToken: () => {
        useAuthStore.getState().clearAuth();
      },
    });

    setupApiInterceptors();

    bootstrapAuth();
  }, []);

  return <>{children}</>;
}