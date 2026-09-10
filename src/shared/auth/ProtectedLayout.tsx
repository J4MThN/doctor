"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "./auth.store";
 

export function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isInitialized =
    useAuthStore(
      (state) => state.isInitialized
    );

  const accessToken =
    useAuthStore(
      (state) => state.accessToken
    );

  useEffect(() => {
    if (
      isInitialized &&
      !accessToken
    ) {
      router.replace("/login");
    }
  }, [
    isInitialized,
    accessToken,
    router,
  ]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>
          در حال بررسی احراز هویت...
        </p>
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
}