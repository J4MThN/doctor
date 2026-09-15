"use client";

import { useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

import PaginationCostom from "../../Pagination/PaginationCostom";
import { NoteDto } from "../../../types";
import { getMediaUrl } from "@/src/core/utils/media.util";

import EmptyImage from "@/src/assest/defualimage/Empty.svg";
import Image from "next/image";
import { usePagination } from "../../../hook/usePagination";

interface TablePointProps {
  notes: NoteDto[];
  loading: boolean;
  onDelete: (id: number) => Promise<boolean>;
}

export default function TablePoint({
  notes,
  loading,
  onDelete,
}: TablePointProps) {
  const router = useRouter();

  const [localNotes, setLocalNotes] = useState<NoteDto[]>(notes);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { currentPage, currentData, pageSize, total, handlePageChange } =
    usePagination(localNotes, 7);

  const handlePointEdit = (id: number) => {
    router.push(`/admin/note/editnote/${id}`);
  };
  // باز کردن مدال
  const handlePointDelete = (id: number) => {
    setDeleteId(id);
  };
  const handleConfirmDelete = async () => {
    if (deleteId === null) return;
    const success = await onDelete(deleteId);

    if (success) {
      setLocalNotes((prev) => prev.filter((note) => note.id !== deleteId));

      setDeleteId(null);
    }
  };

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const columns: ColumnsType<NoteDto> = [
    {
      title: "آیکون",
      dataIndex: "icon",
      key: "icon",
      width: "10%",
      align: "right",

      render: (icon: string) => (
        <img
          width={32}
          height={32}
          className="w-8 h-8"
          src={getMediaUrl(icon)}
          alt="icon"
        />
      ),
    },

    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: "15%",
      align: "right",

      render: (title: string) => (
        <span className="doctor-table-text">{title}</span>
      ),
    },

    {
      title: "توضیحات",
      dataIndex: "desc",
      key: "desc",
      width: "30%",
      align: "right",

      render: (desc: string) => (
        <span className="doctor-table-text">{desc}</span>
      ),
    },

    {
      title: "تعداد عکس",
      key: "images",
      width: "15%",
      align: "right",

      render: (_, record) => (
        <span className="doctor-table-text font-text-table">
          {record.images?.length ?? 0}
        </span>
      ),
    },

    {
      title: "#",
      key: "action",
      width: "5%",
      align: "right",

      render: (_, record) => {
        return (
          <div className="flex">
            <button
              type="button"
              onClick={() => handlePointEdit(record.id)}
              className="flex items-center justify-center ml-2 w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
            >
              <HugeiconsIcon
                icon={Edit02Icon}
                size={20}
                color="#6666C6"
                strokeWidth={1.5}
                stroke="#6666C6"
              />
            </button>
            <button
              type="button"
              onClick={() => handlePointDelete(record.id)}
              className=" flex items-center justify-center w-9 h-9 border border-[#E5E5EA] cursor-pointer rounded-4xl"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={20}
                color="#E51D1D"
                strokeWidth={1.5}
              />
            </button>
          </div>
        );
      },
    },
  ];

  if (!notes.length) {
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
    <>
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
            <Table<NoteDto>
              rowKey="id"
              columns={columns}
              dataSource={localNotes}
              loading={loading}
              pagination={false}
              className="doctor-table"
            />

            {total > pageSize && (
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

      {/* Delete Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-82.5 h-50 rounded-3xl bg-white p-4">
            <div className="flex justify-start">
              <button type="button" onClick={() => setDeleteId(null)}>
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-[#FF657D] cursor-pointer"
                />
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-[16px] font-bold text-[#4D4D4D] mt-2">
                آیا میخواهید این نکته را حذف کنید؟
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="w-26 h-10 rounded-lg border border-[#80838D] text-[#80838D] text-[14px] cursor-pointer"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-26 h-10 rounded-lg bg-[#FF657D] text-white text-[14px] cursor-pointer"
              >
                بله
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
