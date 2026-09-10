
import { axiosInstance } from "@/src/core/api/axiosInstance";
import { UserProfileDto } from "../types";
import { ENDPOINTS } from "@/src/core";
 

class UsersService {
  async getAll(): Promise<UserProfileDto[]> {
    const response = await axiosInstance.get<UserProfileDto[]>(
      ENDPOINTS.USERS.GET_ALL
    );

    return response.data;
  }

  async getById(id: number): Promise<UserProfileDto> {
    const response = await axiosInstance.get<UserProfileDto>(
      ENDPOINTS.USERS.GET_BY_ID(id)
    );

    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(
      ENDPOINTS.USERS.DELETE(id)
    );
  }
}

export const usersService = new UsersService();