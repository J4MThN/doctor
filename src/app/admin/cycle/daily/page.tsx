"use client";

import { useSearchParams } from "next/navigation";
import { ListDaily } from "@/src/modules/Admin/admin/components/Cycle/ListDaily/ListDaily";
import { useUserById } from "@/src/modules/Admin/admin/hook/useUserById";

const Page = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const DailyId = searchParams.get("DailyId");

  const { user: selectedUser } = useUserById(id ?? "");

  if (!id || !DailyId) {
    return null;
  }

  return (
    <div className="flex w-full flex-1 min-h-0 bg-white">
      <div className="w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
        <div className="flex mt-4 mr-6 font-bold text-[#6666C6]">
          <span className="text-[16px] ml-2">لیست علائم روزانه</span>

          <span className="text-[14px] ml-2 text-[#FF657D] font-normal pt-1">
            ({selectedUser?.firstName} {selectedUser?.lastName})
          </span>
        </div>

        <div className="mx-4 mt-4">
          <ListDaily id={id} cycleId={DailyId} />
        </div>
      </div>
    </div>
  );
};

export default Page;
