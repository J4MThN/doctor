"use client";

import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import PaginationCostom from "../../Pagination/PaginationCostom";
import { useState } from "react";
import { PregnancyTableData } from "../../../hook/usePregnancies";

import EmptyImage from "@/src/assest/defualimage/Empty.svg";
import Image from "next/image";
import { usePagination } from "../../../hook/usePagination";
import TableSkeleton from "../../TableSkeleton/TableSkeleton";

interface DoctorsTableProps {
  pregnancies: PregnancyTableData[];
  loading: boolean;
  error: string | null;
  activeDoctorId?: string;
}

const calculateAge = (birthDate: string) => {
  if (!birthDate) return 0;

  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
};

export default function TablePregnancy({
  pregnancies,
  loading,
  error,
}: DoctorsTableProps) {
  const { currentPage, currentData, pageSize, total, handlePageChange } =
    usePagination(pregnancies, 7);

  const columns: ColumnsType<PregnancyTableData> = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "user",
      key: "name",
      width: "20%",
      align: "right",
      render: (user) => (
        <span className="doctor-table-text">
          {user ? `${user.firstName} ${user.lastName}` : "-"}
        </span>
      ),
    },
    {
      title: "موبایل",
      dataIndex: "user",
      key: "mobile",
      width: "15%",
      align: "right",
      render: (user) => (
        <span className="doctor-table-text" dir="ltr">
          {user?.mobile ?? "-"}
        </span>
      ),
    },
    {
      title: "سن",
      dataIndex: "user",
      key: "age",
      width: "15%",
      align: "right",
      render: (user) => (
        <span className="doctor-table-text">
          {" "}
          <span className="font-text-table">
            {user ? calculateAge(user.birthDate) : "-"}
          </span>{" "}
          سال
        </span>
      ),
    },
    {
      title: "وضعیت تاهل",
      dataIndex: "user",
      key: "maritalStatus",
      width: "15%",
      align: "right",
      render: (user) => (
        <span className="doctor-table-text">{user?.maritalStatus ?? "-"}</span>
      ),
    },
    {
      title: "تعداد سیکل",
      dataIndex: "user",
      key: "cycleCount",
      width: "20%",
      align: "right",
      render: (user) => (
        <span className="doctor-table-text">
          {" "}
          <span className="font-text-table">{user?.cycleCount ?? "-"}</span> روز
        </span>
      ),
    },
    {
      title: "قصد بارداری طی 12 ماه آینده",
      key: "pregnancyCount",
      dataIndex: "status",
      width: "20%",
      align: "right",
      render: (status: string) => (
        <span className="doctor-table-text">{status || "-"}</span>
      ),
    },
  ];

  if (loading) {
    return (
      <TableSkeleton
        columns={[
          { width: "20%" },
          { width: "20%" },
          { width: "10%" },
          { width: "10%" },
          { width: "20%" },
          { width: "20%" },
        ]}
        rows={5}
      />
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!pregnancies.length) {
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
          <Table<PregnancyTableData>
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
