"use client";

import { useEffect, useState } from "react";

import { CommentResponseDto, PendingCommentResponseDto } from "../types";
import { commentsService } from "../services/comments.service";

export interface CommentTableItem extends PendingCommentResponseDto {
  status: "در انتظار تایید";
}

export function useCommentActions(
  initialComments: PendingCommentResponseDto[],
) {
  const [comments, setComments] = useState<CommentTableItem[]>([]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setComments(
      initialComments.map((item) => ({
        ...item,
        status: "در انتظار تایید",
      })),
    );
  }, [initialComments]);

  const handleStatusChange = async (
    id: string,
    status: "تایید شده" | "رد شده",
  ) => {
    try {
      if (status === "تایید شده") {
        await commentsService.approve(Number(id));
      } else {
        await commentsService.reject(Number(id));
      }

      setComments((prev) =>
        prev.filter((item) => String(item.commentId) !== String(id)),
      );

      setOpenMenuId(null);
    } catch (error) {
      console.error("Change comment status error:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await commentsService.delete(Number(deleteId));

      setComments((prev) =>
        prev.filter((item) => String(item.commentId) !== String(deleteId)),
      );

      setDeleteId(null);
    } catch (error) {
      console.error("Delete comment error:", error);
    }
  };

  const handleOpenMenu = (id: string) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  const handleOpenDeleteModal = (id: string) => {
    setDeleteId(id);
    setOpenMenuId(null);
  };
  const handleCloseDeleteModal = () => {
    setDeleteId(null);
  };

  return {
    comments,
    openMenuId,
    deleteId,
    handleStatusChange,
    handleDelete,
    handleOpenMenu,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    setOpenMenuId,
  };
}
