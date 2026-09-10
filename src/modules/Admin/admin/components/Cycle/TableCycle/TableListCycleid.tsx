"use client";

import { useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";

import { CycleDto } from "../../../types";
import PaginationCostom from "../../Pagination/PaginationCostom";

interface DoctorsTableProps {
  activeDoctorId?: string;
  userId: string;
  cycles: CycleDto[];
  loading: boolean;
}

export default function TableListCycleid({
  activeDoctorId,
  userId,
  cycles,
  loading,
}: DoctorsTableProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 7;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = cycles.slice(startIndex, endIndex);

  const handleCycleList = (cycleId: number) => {
    router.push(`/cycle/${userId}/${cycleId}`);
  };

  const columns: ColumnsType<CycleDto> = [
    {
      title: "تاریخ پریودی",
      dataIndex: "startDate",
      key: "startDate",
      width: "25%",
      align: "right",
      render: (date: string) => (
        <span className="doctor-table-text font-text-table">
          {date}
        </span>
      ),
    },

    {
      title: "طول پریودی",
      dataIndex: "periodLengthDays",
      key: "periodLengthDays",
      width: "20%",
      align: "right",
      render: (length: number) => (
        <span className="doctor-table-text">
          <span className="font-text-table">
            {length}
          </span>{" "}
          روز
        </span>
      ),
    },

    {
      title: "دوره ی پریودی",
      dataIndex: "cycleLengthDays",
      key: "cycleLengthDays",
      width: "20%",
      align: "right",
      render: (cycleLength: number) => (
        <span className="doctor-table-text">
          <span className="font-text-table">
            {cycleLength}
          </span>{" "}
          روز
        </span>
      ),
    },

    {
      title: "#",
      key: "action",
      width: "1%",
      align: "right",

      render: (_, record) => {
        const isActive =
          activeDoctorId === String(record.id);

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
            onClick={() =>
              handleCycleList(record.id)
            }
            className={`cycle-button ${
              isActive
                ? "cycle-button-active"
                : ""
            }`}
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

          <Table<CycleDto>
            rowKey="id"
            columns={columns}
            dataSource={currentData}
            loading={loading}
            pagination={false}
            className="doctor-table"
          />

          {cycles.length > 7 && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={cycles.length}
              onPageChange={setCurrentPage}
            />
          )}

        </div>
      </div>
    </ConfigProvider>
  );
}