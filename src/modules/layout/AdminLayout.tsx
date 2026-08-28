"use client";

import Header from "./components/Header";
import Nav from "./components/Nav";
import { usePathname } from "next/navigation";

export default function AdminLayout() {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/": "لیست افراد",
    "/pregnancy": "لیست  افراد باردار",
    "/note": "لیست نکات",
    "/article": " لیست مقالات",
    "/comment": "لیست نظرات",
  };

  return (
    <div className="flex w-full flex-col">
      <Header />
      <Nav title={pageTitles[pathname]}  />
    </div>
  );
}