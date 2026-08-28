"use client";

import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import {Users} from "../../../types/user";
import { user } from "../../../data/users";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TableCycle({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();

  const handleCycleList = () => {
    router.push("/cycle");
  };

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
        <span className="doctor-table-text">{age} سال</span>
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
        <span className="doctor-table-text">{count} روز</span>
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
            icon={<EyeOutlined />}
            onClick={handleCycleList}
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
        <Table<Users>
          rowKey="key"
          columns={columns}
          dataSource={user}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: false,
            placement: ["bottomCenter"],
            itemRender: (page, type, originalElement) => {
              if (type === "next") {
                return (
                  <span className="pagination-arrow">
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={24}
                      color="#FF657D"
                      strokeWidth={1.5}
                    />
                  </span>
                );
              }

              if (type === "prev") {
                return (
                  <span className="pagination-arrow">
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={24}
                      color="#AEAEB2"
                      strokeWidth={1.5}
                    />
                  </span>
                );
              }

              return originalElement;
            },
          }}
          className="doctor-table"
        />
      </div>
    </ConfigProvider>
  );
}
