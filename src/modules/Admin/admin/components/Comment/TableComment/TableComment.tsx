"use client";

import { useCallback, useRef } from "react";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalIcon,
  Tick02Icon,
  Cancel01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import PaginationCostom from "../../Pagination/PaginationCostom";
import { useCommentActions } from "../../../hook/useCommentAction";
import { useClickOutside } from "../../../hook/useClickQutside.ts";
import ImageDeletComment from "./ModalComment/ImageDeletComment";

import Image from "next/image";
import CommentImage from "@/src/assest/defualimage/comment.svg";
import { PendingCommentResponseDto } from "../../../types/comment.types";
import { usePagination } from "../../../hook/usePagination";
import TableSkeleton from "../../TableSkeleton/TableSkeleton";

interface TableCommentProps {
  comments: PendingCommentResponseDto[];
  loading: boolean;
  error: string | null;
}

export default function TableComment({
  comments,
  loading,
  error,
}: TableCommentProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    comments: actionComments,
    openMenuId,
    deleteId,
    handleStatusChange,
    handleDelete,
    handleOpenMenu,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    setOpenMenuId,
  } = useCommentActions(comments);

  const { currentPage, currentData, pageSize, total, handlePageChange } =
    usePagination(actionComments, 7);

  const closeMenu = useCallback(() => {
    setOpenMenuId(null);
  }, [setOpenMenuId]);

  useClickOutside(menuRef, closeMenu);

  if (loading) {
    return (
      <TableSkeleton
        columns={[
          { width: "10%" },
          { width: "42%" },
          { width: "20%" },
               {
            width: "15%",
          },
            {
            width: "8%",
            buttonWidth: 40,
          },
        ]}
        rows={5}
      />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!actionComments.length) {
    return (
      <div className="py-10 flex flex-col items-center justify-center">
        <Image
          src={CommentImage}
          alt="Comment"
          width={150}
          height={150}
          className="object-contain mb-6"
        />

        <span className="font-text-table text-[16px] text-[#6666C6]">
          نظری وجود ندارد
        </span>
      </div>
    );
  }

  const columns: ColumnsType<PendingCommentResponseDto> = [
    {
      title: "عنوان مقاله",
      dataIndex: "articleTitle",
      key: "articleTitle",
      width: "15%",
      align: "right",
      render: (articleTitle: string) => {
        const maxLength = 40;
        const shortText =
          articleTitle.length > maxLength
            ? `${articleTitle.slice(0, maxLength)}...`
            : articleTitle;

        return (
          <span className="doctor-table-text" title={articleTitle}>
            {shortText}
          </span>
        );
      },
    },
    {
      title: "متن نظر",
      dataIndex: "commentText",
      key: "commentText",
      width: "30%",
      align: "right",
      render: (commentText: string) => {
        const maxLength = 100;
        const shortText =
          commentText.length > maxLength
            ? `${commentText.slice(0, maxLength)}...`
            : commentText;

        return (
          <span className="doctor-table-text" title={commentText}>
            {shortText}
          </span>
        );
      },
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: "15%",
      align: "right",
      render: (status: string) => {
        const isApproved = status === "تایید شده";
        return (
          <div
            className={`w-fit h-8 px-2 rounded-full flex items-center justify-center gap-1 doctor-table-text-statuse-comment
              ${
                isApproved
                  ? "bg-[#E7FFFE] border border-[#39DAD5] text-[#39DAD5]"
                  : "bg-[#FFE5E5] border border-[#E51D1D] text-[#E51D1D]"
              }`}
          >
            <HugeiconsIcon
              icon={isApproved ? Tick02Icon : Cancel01Icon}
              size={16}
              strokeWidth={1.8}
            />
            <span className="text-[14px]">{status}</span>
          </div>
        );
      },
    },
    {
      title: "#",
      key: "action",
      width: "5%",
      align: "right",
      render: (_, record) => {
        const isOpen = openMenuId === String(record.commentId);
        const recordIndex = currentData.findIndex(
          (item) => item.commentId === record.commentId,
        );
        const openUp = recordIndex >= currentData.length - 2;

        return (
          <div
            ref={isOpen ? menuRef : undefined}
            className="relative flex doctor-table-text-statuse-comment"
          >
            <button
              type="button"
              onClick={() => handleOpenMenu(String(record.commentId))}
              className={`flex items-center justify-center ml-2 w-9 h-9 cursor-pointer rounded-full border
                ${
                  isOpen
                    ? "border-[#FF657D] bg-[#FFECEF]"
                    : "border-[#E5E5EA] bg-white"
                }`}
            >
              <HugeiconsIcon
                icon={MoreVerticalIcon}
                size={20}
                color={isOpen ? "#FF657D" : "#6666C6"}
                strokeWidth={1.5}
              />
            </button>
            {isOpen && (
              <div
                className={`absolute z-50 w-32.5 h-31 rounded-2xl bg-white border border-[#E5E5EA] shadow-[0_0px_20px_rgba(0,0,0,0.08)] p-2
                  ${openUp ? "bottom-0 left-22" : "top-0 left-22"}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(String(record.commentId), "تایید شده")
                  }
                  className=" group w-28 h-9 rounded-full flex items-center justify-between gap-2 px-2 text-[#60646C] hover:bg-[#FFF0F2] hover:text-[#FF657D] cursor-pointer"
                >
                  <span className="text-[12px]">تایید کردن</span>
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={18}
                    strokeWidth={1.7}
                    className=" text-[#60646C] group-hover:text-[#FF657D]"
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(String(record.commentId), "رد شده")
                  }
                  className=" group w-28 h-9 rounded-full flex items-center justify-between gap-2 px-2 text-[#60646C] hover:bg-[#FFF0F2] hover:text-[#FF657D] cursor-pointer"
                >
                  <span className="text-[12px]">رد کردن</span>
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={1.7}
                    className=" text-[#60646C] group-hover:text-[#FF657D]"
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenDeleteModal(String(record.commentId))
                  }
                  className=" group w-28 h-9 rounded-full flex items-center justify-between gap-2 px-2 text-[#60646C] hover:bg-[#FFF0F2] hover:text-[#FF657D] cursor-pointer "
                >
                  <span className="text-[12px]">حذف پیام</span>
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={18}
                    strokeWidth={1.7}
                    className=" text-[#60646C] group-hover:text-[#FF657D]"
                  />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <ConfigProvider
      direction="rtl"
      theme={{ components: { Pagination: { itemActiveBg: "transparent" } } }}
    >
      <div className="doctor-table-wrapper">
        <div className="doctor-table-content">
          <Table<PendingCommentResponseDto>
            rowKey="commentId"
            columns={columns}
            dataSource={currentData}
            pagination={false}
            className="doctor-table"
          />
          {total > pageSize && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={total}
              onPageChange={handlePageChange}
            />
          )}
          <ImageDeletComment
            open={deleteId !== null}
            onConfirm={handleDelete}
            onCancel={handleCloseDeleteModal}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
