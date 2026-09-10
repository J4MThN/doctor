"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { usersService } from "../services/users.service";
import { UserProfileDto } from "../types";
import { Users } from "../types";
import { mapUserToTable } from "../mapping/users.mapper";

export const useUsers = () => {
  const [users, setUsers] = useState<UserProfileDto[]>([]);
  
  //  const [users, setUsers] = useState<Users[]>(
  //   []
  // );
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // const totalUsers = response.length;

      // const tableUsers = response.map((user) =>
      //   mapUserToTable(user, totalUsers)
      // );

      // setUsers(tableUsers);

      const response = await usersService.getAll();

      setUsers(response);
    } catch (error) {
      console.error("Get users error:", error);


      setError("خطا در دریافت لیست افراد.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    users,
    loading,
    error,
    refetch: getUsers,
  };
};