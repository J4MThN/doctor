"use client";

import { useAuthStore } from "@/src/shared/auth/auth.store";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { usePathname } from "next/navigation";

export default function AdminLayout() {
  const pathname = usePathname();

  const profile = useAuthStore((state) => state.profile);

  const pageTitles: Record<string, string[]> = {
    "/admin": ["خانه", "لیست افراد"],
    "/admin/pregnancy": ["خانه", "لیست  افراد باردار"],
    "/admin/note": ["خانه", "لیست نکات"],
    "/admin/article": ["خانه", " لیست مقالات"],
    "/admin/comment": ["خانه", "لیست نظرات"],
  };

  let items = pageTitles[pathname] ?? ["خانه"];

  if (pathname.startsWith("/admin/article/editarticle/")) {
    items = ["خانه", "لیست مقالات", "ویرایش مقاله"];
  }

  if (pathname.startsWith("/admin/article/addarticle")) {
    items = ["خانه", "لیست مقالات", "افزودن مقاله"];
  }
  
  if (
    pathname.startsWith("/admin/cycle/") &&
    pathname.split("/").length === 5
  ) {
    items = ["خانه", "لیست افراد", "لیست سیکل ها", "لیست علائم روزانه"];
  } else if (pathname.startsWith("/admin/cycle/")) {
    items = ["خانه", "لیست افراد", "لیست سیکل ها"];
  }

  if (pathname.startsWith("/admin/note/editnote/")) {
    items = ["خانه", "لیست نکات", "ویرایش نکته"];
  }

  if (pathname.startsWith("/admin/note/addnote")) {
    items = ["خانه", "لیست نکات", "افزودن نکته"];
  }

  return (
    <div className="flex w-full flex-col">
      <Header user={profile} />
      <Nav items={items} />
    </div>
  );
}
