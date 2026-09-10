"use client";

import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Point } from "../../../types";
import { points } from "../../../data/users";
import PaginationCostom from "../../Pagination/PaginationCostom";
import { useState } from "react";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TablePoint({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = points.slice(startIndex, endIndex);

  const handlePointEdit = (id: string) => {
    router.push(`/note/editnote/${id}`);
  };
  const handlePointDelete = (id: string) => {
    console.log("Delete:", id);
  };

  const columns: ColumnsType<Point> = [
    {
      title: " آیکون",
      dataIndex: "icon",
      key: "icon",
      width: "10%",
      align: "right",
      render: (icon) => <Image width={32} height={32} className="w-8 h-8" src={icon} alt="icon" />,
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
      dataIndex: "image",
      key: "image",
      width: "15%",
      align: "right",
      render: (image: number) => (
        <span className="doctor-table-text font-text-table">{image}</span>
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
              onClick={() => handlePointEdit(record.key)}
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
              onClick={() => handlePointDelete(record.key)}
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
          <Table<Point>
            rowKey="key"
            columns={columns}
            dataSource={currentData}
            pagination={false}
            className="doctor-table"
          />
          {points.length > pageSize && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={points.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
