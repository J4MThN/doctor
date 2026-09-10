"use client";

import { Pagination as AntPagination } from "antd";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface CustomPaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function PaginationCostom({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: CustomPaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="doctor-pagination-wrapper">
      <AntPagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false}
        showQuickJumper={false}
        align="center"
        onChange={onPageChange}
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            const isDisabled = currentPage === 1;
            return (
              <span
                className={`pagination-arrow ${
                  isDisabled
                    ? "pagination-arrow pagination-arrow-disabled"
                    : "pagination-arrow pagination-arrow-active"
                }`}
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={24}
                  strokeWidth={1.5}
                />
              </span>
            );
          }
          if (type === "next") {
            const isDisabled = currentPage === totalPages;
            return (
              <span
                className={`pagination-arrow ${
                  isDisabled
                    ? "pagination-arrow pagination-arrow-disabled"
                    : "pagination-arrow pagination-arrow-active"
                }`}
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={24}
                  strokeWidth={1.5}
                />
              </span>
            );
          }
          return originalElement;
        }}
      />
    </div>
  );
}
