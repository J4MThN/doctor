"use client";

import { useEffect, useRef } from "react";

import { bootstrapAuth } from "@/src/shared/auth/auth.bootstrap";
import { useAuthStore } from "@/src/shared/auth/auth.store";

import { configureTokenProvider } from "@/src/core/auth/token.provider";
import { setupApiInterceptors } from "@/src/core/api/interceptors/setupApiInterceptors";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) {
      return;
    }

    bootstrapped.current = true;

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