
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