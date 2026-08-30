"use client";

import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Edit02Icon,
  Cancel01Icon,
  EcoPowerIcon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Article, Point } from "../../../types";
import { article, points } from "../../../data/users";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TableArticle({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();

  const handlePointEdit = (id:string) => {
    router.push(`/article/editarticle/${id}`);
  };
    const handlePointDelete = (id:string) => {
     console.log("Delete:" ,id)
  };

  const columns: ColumnsType<Article> = [
    {
      title: " عکس",
      dataIndex: "icon",
      key: "icon",
      width: "10%",
      align: "right",
      render: (icon) => (
        <Image className="w-12 h-12 rounded-xl" src={icon} alt="icon" />
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
      width: "25%",
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
      render: (subject: any) => (
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
      width: "12%",
      align: "right",
      render: (_, record) => {
        const isActive = activeDoctorId === record.key;

        return (
          <div className="flex">
            <button
              type="button"
              onClick={() => handlePointEdit(record.key)}
              className="flex items-center justify-center ml-2 w-10 h-10 border border-[#E5E5EA] cursor-pointer rounded-4xl"
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
              onClick={() => handlePointDelete(record.key)}
              className="flex items-center justify-center w-10 h-10 border border-[#E5E5EA] cursor-pointer rounded-4xl"
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
        <Table<Article>
          rowKey="key"
          columns={columns}
          dataSource={article}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: false,
            placement: ["bottomCenter"],
            itemRender: (page, type, originalElement) => {
              if (type === "next") {
                return (
                  <span className="pagination-arrow">
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={24}
                      color="#FF657D"
                      strokeWidth={1.5}
                    />
                  </span>
                );
              }

              if (type === "prev") {
                return (
                  <span className="pagination-arrow">
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={24}
                      color="#AEAEB2"
                      strokeWidth={1.5}
                    />
                  </span>
                );
              }

              return originalElement;
            },
          }}
          className="doctor-table"
        />
      </div>
    </ConfigProvider>
  );
}
