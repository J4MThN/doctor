"use client";

import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";

import PaginationCostom from "../../Pagination/PaginationCostom";

import EmptyImage from "@/src/assest/defualimage/Empty.svg";
import Image from "next/image";
import { CycleDto } from "../../../types/cycle.types";
import { usePagination } from "../../../hook/usePagination";
import TableSkeleton from "../../TableSkeleton/TableSkeleton";

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

  const { currentPage, currentData, pageSize, total, handlePageChange } =
    usePagination(cycles, 7);

  const handleCycleList = (cycleId: number) => {
    router.push(`/admin/cycle/daily?id=${userId}&DailyId=${cycleId}`);
  };

  const columns: ColumnsType<CycleDto> = [
    {
      title: "تاریخ پریودی",
      dataIndex: "startDate",
      key: "startDate",
      width: "25%",
      align: "right",
      render: (date: string) => (
        <span className="doctor-table-text font-text-table">{date}</span>
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
          <span className="font-text-table">{length}</span> روز
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
          <span className="font-text-table">{cycleLength}</span> روز
        </span>
      ),
    },

    {
      title: "#",
      key: "action",
      width: "1%",
      align: "right",

      render: (_, record) => {
        const isActive = activeDoctorId === String(record.id);

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
            onClick={() => handleCycleList(record.id)}
            className={`cycle-button ${isActive ? "cycle-button-active" : ""}`}
          >
            لیست علائم روزانه
          </Button>
        );
      },
    },
  ];

  if (loading) {
    return (
      <TableSkeleton
        columns={[
          { width: "25%" },
          { width: "20%" },
          { width: "20%" },
          {
            width: "1fr",
            type: "button",
            buttonWidth: 140,
          },
        ]}
        rows={5}
      />
    );
  }

  if (!cycles.length) {
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
            pagination={false}
            className="doctor-table"
          />

          {total > 7 && (
            <PaginationCostom
              currentPage={currentPage}
              pageSize={pageSize}
              total={total}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
