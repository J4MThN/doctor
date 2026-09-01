"use client";

import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { Comment } from "../../../types";
import { comment } from "../../../data/users";
import PaginationCostom from "../../Pagination/PaginationCostom";
import { useState } from "react";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TableComment({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();

  //   const handlePointEdit = (id: string) => {
  //     router.push(`/note/editnote/${id}`);
  //   };
  //   const handlePointDelete = (id: string) => {
  //     console.log("Delete:", id);
  //   };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = comment.slice(startIndex, endIndex);

  const columns: ColumnsType<Comment> = [
    {
      title: " نام و نام خانوادگی",
      dataIndex: "name",
      key: "icnameon",
      width: "15%",
      align: "right",
      render: (name: string) => (
        <span className="doctor-table-text">{name}</span>
      ),
    },
    {
      title: "متن نظر",
      dataIndex: "desc",
      key: "desc",
      width: "30%",
      align: "right",
      render: (desc: string) => (
        <span className="doctor-table-text">{desc}</span>
      ),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: "15%",
      align: "right",
      render: (status) => <span className="doctor-table-text">{status}</span>,
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
              //   onClick={() => handlePointEdit(record.key)}
              className="flex items-center justify-center ml-2 w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
            >
              <HugeiconsIcon
                icon={MoreVerticalIcon}
                size={20}
                color="#6666C6"
                strokeWidth={1.5}
                stroke="#6666C6"
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
        <Table<Comment>
          rowKey="key"
          columns={columns}
          dataSource={currentData}
          pagination={false}
          className="doctor-table"
        />
        {comment.length > pageSize && (
          <PaginationCostom
            currentPage={currentPage}
            pageSize={pageSize}
            total={comment.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </ConfigProvider>
  );
}
