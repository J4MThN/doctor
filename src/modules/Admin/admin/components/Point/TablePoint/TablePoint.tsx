"use client";

import { useState } from "react";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

import Image from "next/image";

import PaginationCostom from "../../Pagination/PaginationCostom";
import { NoteDto } from "../../../types";
import { getMediaUrl } from "@/src/core/utils/media.util";

interface TablePointProps {
  notes: NoteDto[];
  loading: boolean;
}

export default function TablePoint({ notes, loading }: TablePointProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = notes.slice(startIndex, endIndex);
  const handlePointEdit = (id: number) => {
    router.push(`/admin/note/editnote/${id}`);
  };
  const handlePointDelete = (id: number) => {
    console.log("Delete:", id);
  };

  const columns: ColumnsType<NoteDto> = [
    {
      title: "آیکون",
      dataIndex: "icon",
      key: "icon",
      width: "10%",
      align: "right",

      render: (icon: string) => (
        <img
          width={32}
          height={32}
          className="w-8 h-8"
          src={getMediaUrl(icon)}
          alt="icon"
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
      title: "تعداد عکس",
      key: "images",
      width: "15%",
      align: "right",

      render: (_, record) => (
        <span className="doctor-table-text font-text-table">
          {record.images?.length ?? 0}
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
              onClick={() => handlePointEdit(record.id)}
              className="flex items-center justify-center ml-2 w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
            >
              <HugeiconsIcon
                icon={Edit02Icon}
                size={20}
                color="#6666C6"
                strokeWidth={1.5}
                stroke="#6666C6"
              />
            </button>
            <button
              type="button"
              onClick={() => handlePointDelete(record.id)}
              className=" flex items-center justify-center w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
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
          <Table<NoteDto>
            rowKey="id"
            columns={columns}
            dataSource={currentData}
            loading={loading}
            pagination={false}
            className="doctor-table"
          />

          {notes.length > pageSize && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={notes.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
