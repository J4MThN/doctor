"use client";

import { useEffect, useState } from "react";

import { CommentResponseDto } from "../types";
import { commentsService } from "../services/comments.service";

export function useCommentActions(initialComments: CommentResponseDto[]) {
  const [comments, setComments] =
    useState<CommentResponseDto[]>(initialComments);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setComments(initialComments);
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

      // آپدیت جدول بعد از موفقیت API
      setComments((prev) =>
        prev.map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                status,
              }
            : item,
        ),
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
        prev.filter((item) => String(item.id) !== String(deleteId)),
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
