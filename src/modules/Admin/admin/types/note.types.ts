export interface CreateNoteRequestDto {
  title: string;
  desc: string;
  icon: File;
}

export interface AddNoteImageRequestDto {
  image: File;
}

export interface NoteImageDto {
  id: number;
  noteId: number;
  imageName: string;
  url: string;
}

export interface NoteDto {
  id: number;
  icon: string;
  title: string;
  desc: string;
  createDate: string;
  images: NoteImageDto[];
}

export interface UpdateNoteRequestDto {
  id: number;
  icon: File | string;
  title: string;
  desc: string;
  createDate: string;
  images: {
    id: number;
    imageName: string;
    url: string;
  }[];
}
