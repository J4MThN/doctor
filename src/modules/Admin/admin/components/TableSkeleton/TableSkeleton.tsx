"use client";

import { Skeleton } from "antd";

interface TableSkeletonColumn {
  width?: string;
  type?: "text" | "button";
  buttonWidth?: number;
}

interface TableSkeletonProps {
  columns: TableSkeletonColumn[];
  rows?: number;
  showHeader?: boolean;
}

export default function TableSkeleton({
  columns,
  rows = 5,
  showHeader = true,
}: TableSkeletonProps) {
  return (
    <div className="doctor-table-wrapper table-skeleton">
      <div className="doctor-table-content px-4 py-4">
        {/* Header */}
        {showHeader && (
          <div
            className="grid items-center gap-4 mb-4 px-2"
            style={{
              gridTemplateColumns: columns
                .map((column) => column.width ?? "1fr")
                .join(" "),
            }}
          >
            {columns.map((_, index) => (
              <div key={index}>
                <Skeleton.Input
                  active
                  size="small"
                  style={{
                    width: "55%",
                    height: 18,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Rows */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid items-center gap-4 px-2 min-h-12"
              style={{
                gridTemplateColumns: columns
                  .map((column) => column.width ?? "1fr")
                  .join(" "),
              }}
            >
              {columns.map((column, columnIndex) => {
                if (column.type === "button") {
                  return (
                    <div key={columnIndex} className="flex justify-end">
                      <Skeleton.Button
                        active
                        size="small"
                        style={{
                          width: column.buttonWidth ?? 130,
                          height: 32,
                          borderRadius: 8,
                        }}
                      />
                    </div>
                  );
                }

                return (
                  <Skeleton.Input
                    key={columnIndex}
                    active
                    size="small"
                    style={{
                      width: "65%",
                      height: 20,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
