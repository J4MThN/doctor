"use client";

import { useState } from "react";
import { comment as initialComments } from "../data/users";

export function useCommentActions() {
  const [comments, setComments] = useState(initialComments);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleStatusChange = (
    id: string,
    status: "تایید شده" | "رد شده",
  ) => {
    setComments((prev) =>
      prev.map((item) =>
        String(item.key) === String(id)
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );
    setOpenMenuId(null);
  };
  const handleDelete = () => {
    if (!deleteId) return;
    setComments((prev) =>
      prev.filter(
        (item) => String(item.key) !== String(deleteId),
      ),
    );
    setDeleteId(null);
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