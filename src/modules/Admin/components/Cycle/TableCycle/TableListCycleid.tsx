"use client";

import { useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";
import { Cycle } from "../../../types/user";
import { cycle } from "../../../data/users";
import PaginationCostom from "../../Pagination/PaginationCostom";

interface DoctorsTableProps {
  activeDoctorId?: string;
  userId: string;
}

export default function TableListCycleid({
  activeDoctorId,
  userId,
}: DoctorsTableProps) {
  const router = useRouter();
  const handleCycleList = (cycleId: string) => {
    router.push(`/cycle/${userId}/${cycleId}`);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = cycle.slice(startIndex, endIndex);

  const columns: ColumnsType<Cycle> = [
    {
      title: "تاریخ پریودی",
      dataIndex: "date",
      key: "date",
      width: "25%",
      align: "right",
      render: (date: string) => (
        <span className="doctor-table-text font-text-table">{date}</span>
      ),
    },
    {
      title: "طول پریودی",
      dataIndex: "lengh",
      key: "lengh",
      width: "20%",
      align: "right",
      render: (lengh: any) => (
        <span className="doctor-table-text">
          {" "}
          <span className="font-text-table">{lengh}</span> روز
        </span>
      ),
    },
    {
      title: "دوره ی پریودی",
      dataIndex: "cycle",
      key: "cycle",
      width: "20%",
      align: "right",
      render: (cycle: any) => (
        <span className="doctor-table-text">
          {" "}
          <span className="font-text-table">{cycle}</span> روز
        </span>
      ),
    },
    {
      title: "#",
      key: "action",
      width: "1%",
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
            لیست علائم روزانه
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
          <Table<Cycle>
            rowKey="key"
            columns={columns}
            dataSource={currentData}
            pagination={false}
            className="doctor-table"
          />
          <PaginationCostom
            currentPage={currentPage}
            pageSize={pageSize}
            total={cycle.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
