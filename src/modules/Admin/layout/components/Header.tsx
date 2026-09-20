"use client";

import Prof from "@/src/assest/defualimage/Profile.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import { Edit02Icon, Logout } from "@hugeicons/core-free-icons";
import { useLogout } from "@/src/shared/auth/use-logout";
import { useState } from "react";
import ModalProfile from "./Modals/ModalProfile";
import ModalLogout from "./Modals/ModalLogOut";

type HeaderUser = {
  firstName: string;
  lastName: string;
  role: string;
};

type HeaderProps = {
  user: HeaderUser | null;
};

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { logout } = useLogout();

  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const onLogOut = async (confirm = false) => {
    if (!confirm) {
      setLogoutOpen(true);
      return;
    }

    setLogoutOpen(false);

    await logout();
  };

  const menus = [
    {
      title: "لیست افراد",
      path: "/admin",
      width: "w-30",
    },
    {
      title: "لیست بارداری ها",
      path: "/admin/pregnancy",
      width: "w-31.5",
    },
    {
      title: "نکات امروز",
      path: "/admin/note",
      width: "w-23",
    },
    {
      title: "مقالات",
      path: "/admin/article",
      width: "w-18.25",
    },
    {
      title: "لیست نظرات",
      path: "/admin/comment",
      width: "w-26.5",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="flex h-12 w-full mt-4 mr-6">
        {/* Profile */}
        <div className="flex w-[15%] bg-white border-[#E5E5EA] items-center">
          <Image
            src={Prof}
            alt="AboutUsPic"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />

          <span className="pr-2 font-black text-[16px]">
            {user
              ? `دکتر ${user.firstName} ${user.lastName}`
              : "در حال بارگذاری..."}
          </span>
        </div>

        {/* Menu */}
        <div className="flex items-center justify-center w-[75%]">
          <ul className="flex space-x-4 text-center">
            {menus.map((menu) => {
              const isActive =
                menu.path === "/admin"
                  ? pathname === "/admin" ||
                    (!pathname.startsWith("/admin/pregnancy") &&
                      !pathname.startsWith("/admin/note") &&
                      !pathname.startsWith("/admin/article") &&
                      !pathname.startsWith("/admin/comment"))
                  : pathname === menu.path ||
                    pathname.startsWith(`${menu.path}/`);

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
        <div className="flex w-[7%]">
          <div
            onClick={() => onLogOut()}
            className="flex items-center justify-center border-2 border-[#E5E5EA] w-12 h-12 rounded-4xl ml-2 cursor-pointer"
            title="خروج"
          >
            <HugeiconsIcon icon={Logout} size={24} color="#6E6E6E" />
          </div>

          <div
            onClick={() => setProfileOpen(true)}
            className="flex items-center justify-center border-2 border-[#E5E5EA] w-12 h-12 rounded-4xl cursor-pointer"
          >
            <HugeiconsIcon icon={Edit02Icon} size={24} color="#6E6E6E" />
          </div>
        </div>
      </div>
      {profileOpen && (
        <ModalProfile
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
      )}

      <ModalLogout
        open={logoutOpen}
        onConfirm={() => onLogOut(true)}
        onCancel={() => setLogoutOpen(false)}
      />
    </>
  );
}
