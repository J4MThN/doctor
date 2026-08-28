"use client";

import { Button, ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EyeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { Point } from "../../../types";
import { points } from "../../../data/users";

interface DoctorsTableProps {
  activeDoctorId?: string;
}


export default function TablePoint({ activeDoctorId }: DoctorsTableProps) {
  const router = useRouter();

 const handleCycleList = () => {
    router.push("/cycle");
  };

  const columns: ColumnsType<Point> = [
    {
      title: " آیکون",
      dataIndex: "icon",
      key: "icon",
      width: "20%",
      align: "right",
      render: (icon) => (
        <Image src={icon} alt="icon"/>
      ),
    },

    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: "15%",
      align: "right",
      render: (title: string) => (
        <span className="doctor-table-text">
          {title}
        </span>
      ),
    },

    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: "25%",
      align: "right",
      render: (desc: string) => (
        <span className="doctor-table-text">{desc}</span>
      ),
    },

    {
      title: "تعداد عکس",
      dataIndex: "image",
      key: "image",
      width: "15%",
      align: "right",
      render: (image: number) => (
        <span className="doctor-table-text">{image}</span>
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
        <Table<Point>
          rowKey="key"
          columns={columns}
          dataSource={points}
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
