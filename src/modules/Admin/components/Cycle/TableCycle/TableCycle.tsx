"use client";

import { useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Users } from "../../../types/user";
import { user } from "../../../data/users";
import PaginationCostom from "../../Pagination/PaginationCostom";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TableCycle({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();
  const handleCycleList = (id: string) => {
    router.push(`/cycle/${id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = user.slice(startIndex, endIndex);
  const columns: ColumnsType<Users> = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "right",
      render: (name: string) => (
        <span className="doctor-table-text">{name}</span>
      ),
    },
    {
      title: "موبایل",
      dataIndex: "mobile",
      key: "mobile",
      width: "20%",
      align: "right",
      render: (mobile: string) => (
        <span className="doctor-table-text" dir="ltr">
          {mobile}
        </span>
      ),
    },
    {
      title: "سن",
      dataIndex: "age",
      key: "age",
      width: "15%",
      align: "right",
      render: (age: number) => (
        <span className="doctor-table-text">
          {" "}
          <span className="font-text-table">{age}</span> سال
        </span>
      ),
    },
    {
      title: "وضعیت تاهل",
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      width: "20%",
      align: "right",
      render: (status: string) => (
        <span className="doctor-table-text">{status}</span>
      ),
    },
    {
      title: "تعداد سیکل",
      dataIndex: "cycleCount",
      key: "cycleCount",
      width: "20%",
      align: "right",
      render: (count: number) => (
        <span className="doctor-table-text">
          <span className="font-text-table">{count}</span> روز
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
          <Button
            type="default"
            icon={
              <HugeiconsIcon
                icon={ViewIcon}
                size={18}
                color="currentColor"
                strokeWidth={1.5}
              />
            }
            onClick={() => handleCycleList(record.key)}
            className={`cycle-button ${isActive ? "cycle-button-active" : ""}`}
          >
            لیست سیکل ها
          </Button>
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
          <Table<Users>
            rowKey="key"
            columns={columns}
            dataSource={currentData}
            pagination={false}
            className="doctor-table"
          />

          <PaginationCostom
            currentPage={currentPage}
            pageSize={pageSize}
            total={user.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
