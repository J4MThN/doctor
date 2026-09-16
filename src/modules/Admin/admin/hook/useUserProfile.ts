"use client";

import { useCallback, useEffect, useState } from "react";

import { usersService } from "../services/users.service";
import { UserProfileDto, UpdateUserProfileDto } from "../types";

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfileDto | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const [updating, setUpdating] = useState<boolean>(false);

  const getUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await usersService.getMe();

      setUser(response);
    } catch (error) {
      console.error("Get user profile error:", error);

      setError("خطا در دریافت اطلاعات پروفایل.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserProfile = useCallback(async (data: UpdateUserProfileDto) => {
    try {
      setUpdating(true);
      setError(null);

      await usersService.updateMe(data);

      setUser((prev) =>
        prev
          ? {
              ...prev,
              ...data,
            }
          : prev,
      );

      return true;
    } catch (error) {
      console.error("Update user profile error:", error);
      setError("خطا در ویرایش اطلاعات پروفایل.");
      return false;
    } finally {
      setUpdating(false);
    }
  }, []);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return {
    user,
    loading,
    updating,
    error,
    refetch: getUserProfile,
    updateUserProfile,
  };
};
