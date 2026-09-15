"use client";

import { useEffect, useState } from "react";
import { useCycles } from "../../../hook/useCycles";
import TableListCycleid from "../TableCycle/TableListCycleid";
import ErrorToast from "../../Toast/ErrorToast";
import { useUserById } from "../../../hook/useUserById";
import { useCyclesByUserId } from "../../../hook/useCyclesByUserId";

interface ListProps {
  id: string;
}

export const ListCycleid = ({ id }: ListProps) => {
  const { cycles, loading, error } = useCyclesByUserId(id);

  const { user: selectedUser } = useUserById(id);

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className="w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
      <div className="flex mt-4 mr-6 font-bold text-[#6666C6]">
        <span className="text-[16px] ml-2">لیست سیکل ها</span>

        <span className="text-[14px] ml-2 text-[#FF657D] font-normal pt-1">
          ({selectedUser?.firstName} {selectedUser?.lastName})
        </span>
        <div className="flex items-center justify-center border border-[#6666C6] bg-[#F2F2FF] w-6 h-6 rounded-4xl">
          <span className="text-[12px] pt-0.5">{cycles.length}</span>
        </div>
      </div>

      <ErrorToast
        open={showError && !!error}
        message={error ?? ""}
        onClose={() => setShowError(false)}
      />

      <div className="mx-4 mt-4">
        <TableListCycleid userId={id} cycles={cycles} loading={loading} />
      </div>
    </div>
  );
};
