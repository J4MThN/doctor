"use client";

import Header from "./components/Header";
import Nav from "./components/Nav";
import { usePathname } from "next/navigation";

export default function AdminLayout() {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/cycle": "لیست افراد",
    "/pregnancy": "لیست افراد",
    "/note": "لیست نکات",
    "/article": " لیست مقالات",
    "/comment": "لیست نظرات",
  };

  const currentTitle = pageTitles[pathname] ?? "داشبورد";

  return (
    <div className="flex w-full flex-col">
      <Header />
      <Nav title={currentTitle}  />
    </div>
  );
}