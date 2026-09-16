import { axiosInstance } from "@/src/core/api/axiosInstance";
import { UpdateUserProfileDto, UserProfileDto } from "../types";
import { ENDPOINTS } from "@/src/core";

class UsersService {
  async getAll(): Promise<UserProfileDto[]> {
    const response = await axiosInstance.get<UserProfileDto[]>(
      ENDPOINTS.USERS.GET_ALL,
    );

    return response.data;
  }

  async getById(id: number): Promise<UserProfileDto> {
    const response = await axiosInstance.get<UserProfileDto>(
      ENDPOINTS.USERS.GET_BY_ID(id),
    );

    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(ENDPOINTS.USERS.DELETE(id));
  }

  async getMe(): Promise<UserProfileDto> {
    const response = await axiosInstance.get<UserProfileDto>(
      ENDPOINTS.USERS.ME,
    );

    return response.data;
  }

  async updateMe(data: UpdateUserProfileDto): Promise<void> {
    await axiosInstance.put(ENDPOINTS.USERS.UPDATE_ME, data);
  }
}

export const usersService = new UsersService();
