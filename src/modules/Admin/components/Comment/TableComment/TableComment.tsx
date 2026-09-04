"use client";

import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalIcon,
  Tick02Icon,
  Cancel01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { Comment } from "../../../types";
import { comment } from "../../../data/users";
import PaginationCostom from "../../Pagination/PaginationCostom";

interface DoctorsTableProps {
  activeDoctorId?: string;
}

export default function TableComment({}: DoctorsTableProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 7;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentData = comment.slice(startIndex, endIndex);

  const handleStatusChange = (id: string, status: "تایید شده" | "رد شده") => {
    const index = comment.findIndex((item) => String(item.key) === String(id));
    if (index === -1) return;
    comment[index] = {
      ...comment[index],
      status,
    };
    setOpenMenuId(null);
    setCurrentPage((page) => page);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleDelete = () => {
    if (!deleteId) return;
    const index = comment.findIndex(
      (item) => String(item.key) === String(deleteId),
    );
    if (index === -1) return;
    comment.splice(index, 1);

    setDeleteId(null);
    setOpenMenuId(null);
    const newTotal = comment.length;
    const maxPage = Math.max(1, Math.ceil(newTotal / pageSize));

    setCurrentPage((page) => Math.min(page, maxPage));
  };

  const columns: ColumnsType<Comment> = [
    {
      title: "نام و نام خانوادگی",
      dataIndex: "name",
      key: "name",
      width: "15%",
      align: "right",
      render: (name: string) => (
        <span className="doctor-table-text">{name}</span>
      ),
    },
    {
      title: "متن نظر",
      dataIndex: "desc",
      key: "desc",
      width: "30%",
      align: "right",
      render: (desc: string) => (
        <span className="doctor-table-text">{desc}</span>
      ),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: "15%",
      align: "right",
      render: (status: string) => {
        const isApproved = status === "تایید شده";
        return (
          <div
            className={`
              w-fit h-8 px-2 rounded-full flex items-center justify-center gap-1 doctor-table-text-statuse-comment ${
                isApproved
                  ? "bg-[#E7FFFE] border border-[#39DAD5] text-[#39DAD5]"
                  : "bg-[#FFE5E5] border border-[#E51D1D] text-[#E51D1D]"
              }`}
          >
            <HugeiconsIcon
              icon={isApproved ? Tick02Icon : Cancel01Icon}
              size={16}
              strokeWidth={1.8}
            />

            <span className="text-[14px]">{status}</span>
          </div>
        );
      },
    },
    {
      title: "#",
      key: "action",
      width: "5%",
      align: "right",
      render: (_, record) => {
        const isOpen = openMenuId === record.key;

        const recordIndex = currentData.findIndex(
          (item) => item.key === record.key,
        );

        const openUp = recordIndex >= currentData.length - 2;
        return (
          <div className="relative flex doctor-table-text-statuse-comment">
            <button
              type="button"
              onClick={() => setOpenMenuId(isOpen ? null : record.key)}
              className={`flex items-center justify-center ml-2 w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-full ${
                isOpen
                  ? "border-[#FF657D] bg-[#FFECEF]"
                  : "border-[#E5E5EA] bg-white"
              }`}
            >
              <HugeiconsIcon
                icon={MoreVerticalIcon}
                size={20}
                color={`${isOpen ? "#FF657D" : "#6666C6"}`}
                strokeWidth={1.5}
              />
            </button>

            {isOpen && (
              <div
                className={`absolute z-50 left-0 w-32.5 h-31 rounded-2xl bg-white border border-[#E5E5EA] shadow-[0_0px_20px_rgba(0,0,0,0.08)] p-2 ${
                  openUp ? "bottom-0 left-22" : "top-0 left-22"
                }`}
              >
                {/* تایید کردن */}
                <button
                  type="button"
                  onClick={() => handleStatusChange(record.key, "تایید شده")}
                  className="group w-28 h-9 rounded-full flex items-center justify-between gap-2 px-2 text-[#60646C] hover:bg-[#FFF0F2] hover:text-[#FF657D] cursor-pointer"
                >
                  <span className="text-[12px]">تایید کردن</span>
                  <HugeiconsIcon
                    icon={Tick02Icon}
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#60646C] group-hover:text-[#FF657D]"
                  />
                </button>

                {/* رد کردن */}
                <button
                  type="button"
                  onClick={() => handleStatusChange(record.key, "رد شده")}
                  className="group w-28 h-9 rounded-full flex items-center justify-between gap-2 px-2 text-[#60646C] hover:bg-[#FFF0F2] hover:text-[#FF657D] cursor-pointer"
                >
                  <span className="text-[12px]">رد کردن</span>
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#60646C] group-hover:text-[#FF657D]"
                  />
                </button>

                {/* حذف پیام */}
                <button
                  type="button"
                  onClick={() => setDeleteId(record.key)}
                  className="group w-28 h-9 rounded-full flex items-center justify-between gap-2 px-2 text-[#60646C] hover:bg-[#FFF0F2] hover:text-[#FF657D] cursor-pointer"
                >
                  <span className="text-[12px]">حذف پیام</span>
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#60646C] group-hover:text-[#FF657D]"
                  />
                </button>
              </div>
            )}
          </div>
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
        <Table<Comment>
          rowKey="key"
          columns={columns}
          dataSource={currentData}
          pagination={false}
          className="doctor-table"
        />

        {comment.length > pageSize && (
          <PaginationCostom
            currentPage={currentPage}
            pageSize={pageSize}
            total={comment.length}
            onPageChange={setCurrentPage}
          />
        )}
        {/* Modal حذف */}
        <Modal
          open={deleteId !== null}
          onCancel={() => setDeleteId(null)}
          footer={null}
          centered
          width={360}
        >
          <div dir="rtl" className="flex flex-col items-center py-4">
            <HugeiconsIcon
              icon={Delete02Icon}
              size={32}
              strokeWidth={1.5}
              className="text-[#FF657D]"
            />

            <p className="mt-4 text-[14px] font-bold text-[#4D4D4D]">
              حذف پیام
            </p>

            <p className="mt-2 text-[12px] text-[#80838D]">
              آیا مطمئنی می‌خواهی این پیام را حذف کنی؟
            </p>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleDelete}
                className="w-27.5 h-9 rounded-lg bg-[#FF657D] text-white text-[12px] cursor-pointer"
              >
                بله، حذف کن
              </button>

              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="w-27.5 h-9 rounded-lg border border-[#BFC0C5] text-[#80838D] text-[12px] cursor-pointer"
              >
                انصراف
              </button>
              {/*  */}
            </div>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
