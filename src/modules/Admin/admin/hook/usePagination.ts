"use client";

import { useMemo, useState } from "react";

export const usePagination = <T>(
  data: T[],
  pageSize: number = 7,
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    currentData,
    pageSize,
    total: data.length,
    totalPages,
    handlePageChange,
    setCurrentPage,
  };
};