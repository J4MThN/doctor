export interface UserProfileDto {
  id: number;
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  maritalStatus: string;
  role: string;
  createDate: string;
  cycleCount: number;
}

export interface CycleDto {
  id: number;
  userId: number;
  startDate: string;
  lastDate: string;
  periodLengthDays: number;
  cycleLengthDays: number;
  createDate: string;
}

////////// note

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

//// article

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

//// category Article

export interface CategoryArticleResponseDto {
  id: number;
  name: string;
}

export interface CreateCategoryArticleRequestDto {
  name: string;
}

export interface UpdateCategoryArticleRequestDto {
  name: string;
}

//// comment

export interface CommentResponseDto {
  id: number;
  userId: number;
  commentText: string;
  createDate: string;
  articleId: number;
  status: string;
}
export interface CreateCommentRequestDto {
  userId: number;
  commentText: string;
  articleId: number;
}

export interface PendingCommentResponseDto {
  commentId: number;
  articleId: number;
  commentText: string;
  articleTitle: string;
}

////////// pregnancy

export interface PregnancyDto {
  id: number;
  userId: number;
  status: string;
  createDate: string;
}
// //////////////////////

export interface Users {
  key: string;
  name: string;
  mobile: string;
  age: number;
  maritalStatus: string;
  cycleCount: number;
}

export interface Cycle {
  key: string;
  date: string;
  lengh: any;
  cycle: any;
}

export interface DailySymptom {
  key: string;
  cycleId: string;
  date: string;
  symptoms: {
    title: string;
    value: string;
    icon?: any;
  }[];
}

export interface Pregnancy {
  key: string;
  name: string;
  mobile: string;
  age: number;
  maritalStatus: string;
  cycleCount: number;
  pregnancyCount: string;
}

export interface Point {
  key: string;
  icon: any;
  iconName: string;
  title: string;
  desc: string;
  image: number;
}

export interface Article {
  key: string;
  icon: any;
  title: string;
  desc: string;
  subject: any;
}

export interface Comment {
  key: string;
  name: string;
  desc: string;
  status: any;
}

export interface ImageItem {
  id: string;
  src: any;
}
