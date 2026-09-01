"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import TableArticle from "./TableArticle/TableArticle";

export const ContentArticle = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/article/addarticle");
  };

  return (
    <div className=" w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
      <div className="flex w-full justify-between mt-4 mr-6 font-bold text-[#6666C6]">
        <div className="flex mt-1">
          <span className="text-[16px] ml-2"> مقالات </span>
          <div className="flex items-center justify-center border border-[#6666C6] bg-[#F2F2FF] w-6 h-6 rounded-4xl">
            <span className="text-[12px] pt-0.5">6</span>
          </div>
        </div>

        <div className="ml-10">
          <button
            type="button"
            onClick={handleNavigation}
            className="flex items-center justify-center border border-[#FF657D] bg-[#FFF1F3] w-25 h-8.5 cursor-pointer
                    transition-all
                    duration-200 rounded-4xl "
          >
            <HugeiconsIcon
              icon={PlusSignIcon}
              size={18}
              color="#FF657D"
              strokeWidth={1.5}
            />
            <span className="text-[12px] text-[#FF657D] font-bold mr-1">
             افزودن خبر
            </span>
          </button>
        </div>
      </div>
      <div className="mx-4 mt-4">
        <TableArticle />
      </div>
    </div>
  );
};
