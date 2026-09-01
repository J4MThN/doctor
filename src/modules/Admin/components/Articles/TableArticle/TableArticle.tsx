"use client";

import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  Cancel01Icon,
  EcoPowerIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Article } from "../../../types";
import { article } from "../../../data/users";
import { useState } from "react";
import PaginationCostom from "../../Pagination/PaginationCostom";

export default function TableArticle() {
  const router = useRouter();

  const handleArticleEdit = (id: string) => {
    router.push(`/article/editarticle/${id}`);
  };
  const handleArticleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = article.slice(startIndex, endIndex);

  const columns: ColumnsType<Article> = [
    {
      title: " عکس",
      dataIndex: "icon",
      key: "icon",
      width: "10%",
      align: "right",
      render: (icon) => (
        <Image className="w-11 h-11 rounded-[10px]" src={icon} alt="icon" />
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
      dataIndex: "subject",
      key: "subject",
      width: "15%",
      align: "right",
      render: (subject) => (
        <span className="doctor-table-text flex">
          {" "}
          <HugeiconsIcon
            icon={EcoPowerIcon}
            size={20}
            strokeWidth={1.5}
            className={`ml-1 ${subject === "عمومی" ? "text-[#6666C6]" : "text-[#FF657D]"}`}
          />
          {subject}
        </span>
      ),
    },
    {
      title: "#",
      key: "action",
      width: "5%",
      align: "right",
      render: (_, record) => {
        return (
          <div className="flex">
            <button
              type="button"
              onClick={() => handleArticleEdit(record.key)}
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
              onClick={() => handleArticleDelete(record.key)}
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
        );
      },
    },
  ];

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
          <Table<Article>
            rowKey="key"
            columns={columns}
            dataSource={currentData}
            pagination={false}
            className="doctor-table"
          />
          {article.length > pageSize && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={article.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
