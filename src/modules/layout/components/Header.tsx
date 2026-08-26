"use client";

import Prof from "@/src/assest/profdoctor/nody-عکس-پزشکی-1633070672.webp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01FreeIcons,
  Notification01Icon,
  Setting07Icon,
} from "@hugeicons/core-free-icons";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    {
      title: "لیست سیکل ها",
      path: "/cycle",
      width: "w-33.75",
    },
    {
      title: "لیست بارداری ها",
      path: "/pregnancy",
      width: "w-31.5",
    },
    {
      title: "نکات امروز",
      path: "/note",
      width: "w-23",
    },
    {
      title: "مقالات",
      path: "/article",
      width: "w-18.25",
    },
    {
      title: "لیست نظرات",
      path: "/comment",
      width: "w-26.5",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex h-full w-full mt-6 mr-3 ml-3">

      {/* Profile */}
      <div className="flex w-[15%] bg-white border-[#E5E5EA] items-center">
        <Image
          className="w-10 h-10 rounded-4xl"
          src={Prof}
          alt="AboutUsPic"
        />

        <span className="pr-2 font-black text-[14px]">
          دکتر مرضیه برومند
        </span>

        <HugeiconsIcon
          icon={ArrowDown01FreeIcons}
          size={20}
          color="#000"
          className="mr-3"
        />
      </div>

      {/* Menu */}
      <div className="flex items-center justify-center w-[75%]">
        <ul className="flex space-x-4 text-center">
          {menus.map((menu) => {
            const isActive = pathname === menu.path;

            return (
              <li key={menu.path} className={menu.width}>
                <button
                  type="button"
                  onClick={() => handleNavigation(menu.path)}
                  className={`
                    w-full
                    h-12
                    rounded-4xl
                    border-2
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "border-[#FF657D] text-[#1C2024] font-black text-base"
                        : "border-[#F2F2F7] text-[#80838D] font-normal text-sm"
                    }
                  `}
                >
                  {menu.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex w-[10%]">
        <div className="flex items-center justify-center border-2 border-[#E5E5EA] w-12 h-12 rounded-4xl ml-2">
          <HugeiconsIcon
            icon={Setting07Icon}
            size={24}
            color="#6E6E6E"
          />
        </div>

        <div className="flex items-center justify-center border-2 border-[#E5E5EA] w-12 h-12 rounded-4xl">
          <HugeiconsIcon
            icon={Notification01Icon}
            size={24}
            color="#6E6E6E"
          />
        </div>
      </div>
    </div>
  );
}