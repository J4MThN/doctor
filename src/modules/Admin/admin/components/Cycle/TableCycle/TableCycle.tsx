"use client";

import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon } from "@hugeicons/core-free-icons";

import PaginationCostom from "../../Pagination/PaginationCostom";

import { UserProfileDto } from "../../../types";
import { usePagination } from "../../../hook/usePagination";
import TableSkeleton from "../../TableSkeleton/TableSkeleton";

interface TableCycleProps {
  users: UserProfileDto[];
  loading: boolean;
  activeDoctorId?: string;
}

export default function TableCycle({
  users,
  loading,
  activeDoctorId,
}: TableCycleProps) {
  const router = useRouter();
  const { currentPage, currentData, pageSize, total, handlePageChange } =
    usePagination(users, 7);

  const handleCycleList = (id: string) => {
    router.push(`/admin/cycle/${id}`);
  };

  const maritalStatusMap: Record<string, string> = {
    Single: "مجرد",
    Married: "متاهل",
    Widowed: "بیوه",
    Divorced: "مطلقه",
  };

  const columns: ColumnsType<UserProfileDto> = [
    {
      title: "نام ",
      key: "name",
      width: "10%",
      align: "right",

      render: (_, record) => (
        <span className="doctor-table-text">{record.firstName}</span>
      ),
    },

    {
      title: "نام خانوادگی",
      key: "name",
      width: "15%",
      align: "right",

      render: (_, record) => (
        <span className="doctor-table-text">{record.lastName}</span>
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
        <span className="doctor-table-text font-text-table">
          {maritalStatusMap[status] ?? "-"}
        </span>
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
          <span className="font-text-table">{count}</span> سیکل
        </span>
      ),
    },

    {
      title: "#",
      key: "action",
      width: "12%",
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
            onClick={() => handleCycleList(String(record.id))}
            className={`cycle-button ${isActive ? "cycle-button-active" : ""}`}
          >
            لیست سیکل ها
          </Button>
        );
      },
    },
  ];

  if (loading) {
    return (
      <TableSkeleton
        columns={[
          { width: "10%" },
          { width: "13%" },
          { width: "17%" },
          { width: "12%" },
          { width: "16%" },
          { width: "16%" },
          {
            width: "10%",
            type: "button",
            buttonWidth: 130,
          },
        ]}
        rows={5}
      />
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
          <Table<UserProfileDto>
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
          {/*  */}
        </div>
      </div>
    </ConfigProvider>
  );
}
