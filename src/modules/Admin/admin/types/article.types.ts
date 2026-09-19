
export interface CreateArticleRequestDto {
  type: string; // "Public" | "Private"
  categoryId: number;
  timeRead: number;
  title: string;
  desc: string;
}

export interface UpdateArticleRequestDto {
  type: string;
  categoryId: number;
  timeRead: number;
  title: string;
  desc: string;
  imagePath: string;
}

export interface AddArticleImageRequestDto {
  image: File;
}

export interface ArticleResponseDto {
  id: number;
  type: string;
  categoryId: number;
  categoryName: string | null;
  timeRead: number;
  title: string;
  desc: string;
  imagePath: string;
  countView: number;
  countLike: number;
  countDislike: number;
  createDate: string;
}
