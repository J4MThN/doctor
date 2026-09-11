"use client";

import { ConfigProvider, Table, Spin, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  Cancel01Icon,
  EcoPowerIcon,
} from "@hugeicons/core-free-icons";

import PaginationCostom from "../../Pagination/PaginationCostom";
import { getMediaUrl } from "@/src/core/utils/media.util";

import { ArticleResponseDto } from "../../../types";

interface TableArticleProps {
  articles: ArticleResponseDto[];
  loading: boolean;
  error: string | null;
}

export default function TableArticle({
  articles,
  loading,
  error,
}: TableArticleProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 7;

  const handleArticleEdit = (id: number) => {
    router.push(`/admin/article/editarticle/${id}`);
  };

  const handleArticleDelete = (id: number) => {
    console.log("Delete:", id);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = articles.slice(startIndex, endIndex);

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
        <span className="doctor-table-text">
          {title}
        </span>
      ),
    },

    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: "30%",
      align: "right",
      render: (desc: string) => (
        <span className="doctor-table-text">
          {desc}
        </span>
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
      <div className="py-10">
        <Empty description="مقاله‌ای وجود ندارد" />
      </div>
    );
  }

  return (
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

          {articles.length > pageSize && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={articles.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}