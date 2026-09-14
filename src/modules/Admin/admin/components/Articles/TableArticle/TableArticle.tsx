"use client";

import { ConfigProvider, Table, Spin, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  Cancel01Icon,
  EcoPowerIcon,
  Comment01Icon,
} from "@hugeicons/core-free-icons";

import PaginationCostom from "../../Pagination/PaginationCostom";
import { getMediaUrl } from "@/src/core/utils/media.util";

import { ArticleResponseDto, CommentResponseDto } from "../../../types";

import EmptyImage from "@/src/assest/defualimage/Empty.svg";
import Image from "next/image";
import { commentsService } from "../../../services/comments.service";
import ModalArticleComment from "../ModalArticleComment/ModalArticleComment";

interface TableArticleProps {
  articles: ArticleResponseDto[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => Promise<boolean>;
}

export default function TableArticle({
  articles,
  loading,
  error,
  onDelete,
}: TableArticleProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [localArticles, setLocalArticles] =
    useState<ArticleResponseDto[]>(articles);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [commentArticle, setCommentArticle] =
    useState<ArticleResponseDto | null>(null);

  const [articleComments, setArticleComments] = useState<CommentResponseDto[]>(
    [],
  );

  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const handleArticleEdit = (id: number) => {
    router.push(`/admin/article/editarticle/${id}`);
  };

  const handleArticleDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleArticleComments = async (article: ArticleResponseDto) => {
    try {
      setCommentArticle(article);
      setCommentsLoading(true);
      setCommentsError(null);

      const response = await commentsService.getByArticleId(article.id);

      const approvedComments = response.filter(
        (comment) => comment.status === "Approved",
      );

      setArticleComments(approvedComments);
    } catch (error) {
      console.error("Get article comments error:", error);
      setCommentsError("خطا در دریافت نظرات مقاله.");
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteId === null) return;

    const success = await onDelete(deleteId);

    if (success) {
      setLocalArticles((prev) =>
        prev.filter((article) => article.id !== deleteId),
      );

      setDeleteId(null);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = localArticles.slice(startIndex, endIndex);

  useEffect(() => {
    setLocalArticles(articles);
  }, [articles]);

  const columns: ColumnsType<ArticleResponseDto> = [
    {
      title: "عکس",
      dataIndex: "imagePath",
      key: "imagePath",
      width: "10%",
      align: "right",
      render: (imagePath: string) => (
        <img
          className="rounded-[10px] object-cover"
          width={44}
          height={44}
          src={getMediaUrl(imagePath)}
          alt="article"
        />
      ),
    },

    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: "15%",
      align: "right",
      render: (title: string) => (
        <span className="doctor-table-text">{title}</span>
      ),
    },

    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: "30%",
      align: "right",
      render: (desc: string) => (
        <span className="doctor-table-text">{desc}</span>
      ),
    },

    {
      title: "موضوع",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "15%",
      align: "right",
      render: (categoryName: string | null) => (
        <span className="doctor-table-text flex">
          <HugeiconsIcon
            icon={EcoPowerIcon}
            size={20}
            strokeWidth={1.5}
            className="ml-1 text-[#6666C6]"
          />

          {categoryName || "بدون موضوع"}
        </span>
      ),
    },

    {
      title: "#",
      key: "action",
      width: "10%",
      align: "right",
      render: (_, record) => (
        <div className="flex">
          <button
            type="button"
            onClick={() => handleArticleEdit(record.id)}
            className="flex items-center justify-center ml-2 w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
          >
            <HugeiconsIcon
              icon={Edit02Icon}
              size={20}
              color="#6666C6"
              strokeWidth={1.5}
            />
          </button>
          <button
            type="button"
            onClick={() => handleArticleComments(record)}
            className="flex items-center justify-center ml-2 w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
          >
            <HugeiconsIcon
              icon={Comment01Icon}
              size={20}
              color="#6666C6"
              strokeWidth={1.5}
            />
          </button>
          <button
            type="button"
            onClick={() => handleArticleDelete(record.id)}
            className="flex items-center justify-center w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={20}
              color="#E51D1D"
              strokeWidth={1.5}
            />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="py-10 flex flex-col items-center justify-center">
        <Image
          src={EmptyImage}
          alt="Empty"
          width={150}
          height={150}
          className="object-contain mb-6"
        />

        <span className="font-text-table text-[16px] text-[#6666C6]">
          لیستی وجود ندارد
        </span>
      </div>
    );
  }

  return (
    <>
      <ConfigProvider
        direction="rtl"
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "transparent",
            },
          },
        }}
      >
        <div className="doctor-table-wrapper">
          <div className="doctor-table-content">
            <Table<ArticleResponseDto>
              rowKey="id"
              columns={columns}
              dataSource={currentData}
              pagination={false}
              className="doctor-table"
            />

            {localArticles.length > pageSize && (
              <PaginationCostom
                currentPage={currentPage}
                pageSize={pageSize}
                total={localArticles.length}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </ConfigProvider>
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-82.5 h-50 rounded-3xl bg-white p-4">
            <div className="flex justify-start">
              <button type="button" onClick={() => setDeleteId(null)}>
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#FF657D] cursor-pointer"
                />
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-[16px] font-bold text-[#4D4D4D] mt-2">
                آیا میخواهید این مقاله را حذف کنید؟
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="w-26 h-10 rounded-lg border border-[#80838D] text-[#80838D] text-[14px] cursor-pointer"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-26 h-10 rounded-lg bg-[#FF657D] text-white text-[14px] cursor-pointer"
              >
                بله
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalArticleComment
        open={commentArticle !== null}
        articleTitle={commentArticle?.title ?? ""}
        comments={articleComments}
        loading={commentsLoading}
        error={commentsError}
        onClose={() => {
          setCommentArticle(null);
          setArticleComments([]);
          setCommentsError(null);
        }}
      />
    </>
  );
}
