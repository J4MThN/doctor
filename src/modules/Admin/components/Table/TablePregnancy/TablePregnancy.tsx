"use client";

import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface Doctor {
  key: string;
  name: string;
  mobile: string;
  age: number;
  maritalStatus: string;
  cycleCount: number;
  pregnancyCount: string;
}

interface DoctorsTableProps {
  activeDoctorId?: string;
}

const doctors: Doctor[] = [
  {
    key: "1",
    name: "ناهید میرزایی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 28,
    maritalStatus: "متاهل",
    cycleCount: 5,
    pregnancyCount: "بله",
  },
  {
    key: "2",
    name: "سیما نوش آبادی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 32,
    maritalStatus: "متاهل",
    cycleCount: 8,
    pregnancyCount: "بله",
  },
  {
    key: "3",
    name: "فاطمه محمدی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 15,
    maritalStatus: "مجرد",
    cycleCount: 4,
    pregnancyCount: "خیر",
  },
  {
    key: "4",
    name: "فاطمه زهرا طبیبی",
    mobile: "۰۹۳۸ ۶۹۶ ۲۱۴۵",
    age: 19,
    maritalStatus: "مجرد",
    cycleCount: 2,
    pregnancyCount: "خیر",
  },
  {
    key: "5",
    name: "نگین رمضانی",
    mobile: "۰۹۳۶ ۷۸۸ ۸۸۴۴",
    age: 36,
    maritalStatus: "مطلقه",
    cycleCount: 15,
    pregnancyCount: "خیر",
  },
  {
    key: "6",
    name: "مینا میرزایی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 69,
    maritalStatus: "متاهل",
    cycleCount: 5,
    pregnancyCount: "بله",
  },
  {
    key: "7",
    name: "نازنین نوش آبادی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 24,
    maritalStatus: "مجرد",
    cycleCount: 8,
    pregnancyCount: "خیر",
  },
  {
    key: "8",
    name: "الهام رضایی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 34,
    maritalStatus: "متاهل",
    cycleCount: 9,
    pregnancyCount: "بله",
  },
  {
    key: "9",
    name: "نرگس محمدی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 31,
    maritalStatus: "مطلقه",
    cycleCount: 11,
    pregnancyCount: "خیر",
  },
  {
    key: "10",
    name: "زهرا حسینی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 26,
    maritalStatus: "مجرد",
    cycleCount: 3,
    pregnancyCount: "خیر",
  },
  {
    key: "11",
    name: "لیلا موسوی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 30,
    maritalStatus: "متاهل",
    cycleCount: 10,
    pregnancyCount: "بله",
  },
  {
    key: "12",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
    pregnancyCount: "بله",
  },
    {
    key: "13",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
    pregnancyCount: "بله",
  },
      {
    key: "14",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
    pregnancyCount: "بله",
  },
];

export default function TablePregnancy({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();

  const columns: ColumnsType<Doctor> = [
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
        <span className="doctor-table-text">{age} سال</span>
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
        <span className="doctor-table-text">{count} روز</span>
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
        <Table<Doctor>
          rowKey="key"
          columns={columns}
          dataSource={doctors}
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
