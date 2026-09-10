"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { usersService } from "../services/users.service";
import { UserProfileDto } from "../types";

export const useUserById = (id: string) => {
  const [user, setUser] =
    useState<UserProfileDto | null>(null);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await usersService.getById(Number(id));

      setUser(response);
    } catch (error) {
      console.error(
        "Get user error:",
        error
      );

      setError(
        "خطا در دریافت اطلاعات کاربر."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return {
    user,
    loading,
    error,
    refetch: getUser,
  };
};