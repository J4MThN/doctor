import { axiosInstance } from "@/src/core/api/axiosInstance";
import { ENDPOINTS } from "@/src/core";

import {
  CreateNoteRequestDto,
  NoteDto,
  NoteImageDto,
  AddNoteImageRequestDto,
} from "../types";

class NotesService {
  async getAll(): Promise<NoteDto[]> {
    const response = await axiosInstance.get<NoteDto[]>(
      ENDPOINTS.NOTES.GET_ALL,
    );

    return response.data;
  }

  async getById(id: number): Promise<NoteDto> {
    const response = await axiosInstance.get<NoteDto>(
      ENDPOINTS.NOTES.GET_BY_ID(id),
    );

    return response.data;
  }

  async create(
    data: Pick<CreateNoteRequestDto, "title" | "desc">,
  ): Promise<NoteDto> {
    const response = await axiosInstance.post<NoteDto>(
      ENDPOINTS.NOTES.CREATE,
      data,
    );

    return response.data;
  }

  async update(id: number, data: CreateNoteRequestDto): Promise<void> {
    await axiosInstance.put(ENDPOINTS.NOTES.UPDATE(id), data);
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(ENDPOINTS.NOTES.DELETE(id));
  }

  async addImage(
    id: number,
    data: AddNoteImageRequestDto,
  ): Promise<NoteImageDto> {
    const response = await axiosInstance.post<NoteImageDto>(
      ENDPOINTS.NOTES.ADD_IMAGE(id),
      data,
    );

    return response.data;
  }

  async deleteImage(imageId: number): Promise<void> {
    await axiosInstance.delete(ENDPOINTS.NOTES.DELETE_IMAGE(imageId));
  }
}

export const notesService = new NotesService();
