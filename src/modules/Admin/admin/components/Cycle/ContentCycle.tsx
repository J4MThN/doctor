"use client";

import { useUsers } from "../../hook/useUsers";
import TableCycle from "./TableCycle/TableCycle";

 

export const ContentCycle = () => {
  const {
    users,
    loading,
    error,
  } = useUsers();

  

  return (
    <div className="w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">

      <div className="flex mt-4 mr-6 font-bold text-[#6666C6]">

        <span className="text-[16px] ml-2">
          افراد
        </span>

        <div className="flex items-center justify-center border border-[#6666C6] bg-[#F2F2FF] w-6 h-6 rounded-4xl">
          <span className="text-[12px] pt-0.5">
            {users.length}
          </span>
        </div>

      </div>

      {error && (
        <div className="mx-4 mt-4 rounded-xl bg-red-50 p-4 text-red-500">
          {error}
        </div>
      )}

      <div className="mx-4 mt-4">
        <TableCycle
          users={users}
          loading={loading}
        />
      </div>

    </div>
  );
};