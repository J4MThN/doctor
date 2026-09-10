"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "./auth.store";
import { Role } from "@/src/core";
 
 
interface RoleGuardProps {
  allowedRoles: Role[];

  children: React.ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const router = useRouter();

  const isInitialized =
    useAuthStore(
      (state) => state.isInitialized
    );

  const user =
    useAuthStore(
      (state) => state.user
    );

  useEffect(() => {
    if (!isInitialized || !user) {
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/forbidden");
    }
  }, [
    isInitialized,
    user,
    allowedRoles,
    router,
  ]);

  if (!isInitialized || !user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}