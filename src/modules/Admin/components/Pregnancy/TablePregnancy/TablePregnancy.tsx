"use client";

import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { pregnancy } from "../../../data/users";
import { Pregnancy } from "../../../types/user";
import PaginationCostom from "../../Pagination/PaginationCostom";
import { useState } from "react";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TablePregnancy({ activeDoctorId }: DoctorsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = pregnancy.slice(startIndex, endIndex);

  const columns: ColumnsType<Pregnancy> = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "name",
      key: "name",
      width: "20%",
      align: "right",
      render: (name: string) => (
        <span className="doctor-table-text">{name}</span>
      ),
    },

    {
      title: "موبایل",
      dataIndex: "mobile",
      key: "mobile",
      width: "15%",
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
        <span className="doctor-table-text"> <span className="font-text-table">{age}</span> سال</span>
      ),
    },

    {
      title: "وضعیت تاهل",
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      width: "15%",
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
        <span className="doctor-table-text"> <span className="font-text-table">{count}</span> روز</span>
      ),
    },

    {
      title: "قصد بارداری طی 12 ماه آینده",
      key: "pregnancyCount",
      dataIndex: "pregnancyCount",
      width: "20%",
      align: "right",
      render: (name: string) => (
        <span className="doctor-table-text">{name}</span>
      ),
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
          <Table<Pregnancy>
            rowKey="key"
            columns={columns}
            dataSource={currentData}
            pagination={false}
            className="doctor-table"
          />
          <PaginationCostom
            currentPage={currentPage}
            pageSize={pageSize}
            total={pregnancy.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
