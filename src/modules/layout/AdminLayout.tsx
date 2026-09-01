"use client";

import Header from "./components/Header";
import Nav from "./components/Nav";
import { usePathname } from "next/navigation";

export default function AdminLayout() {
  const pathname = usePathname();

  const pageTitles: Record<string, string[]> = {
    "/": [ "خانه" , "لیست افراد" ],
    "/pregnancy": [ "خانه" ,"لیست  افراد باردار"],
    "/note": ["خانه", "لیست نکات" ],
    "/article": ["خانه", " لیست مقالات" ],
    "/comment": ["خانه", "لیست نظرات" ],
  };

  let items = pageTitles[pathname] ?? ["خانه"];

  if (pathname.startsWith("/article/editarticle/")){
    items = [ "خانه", "لیست مقالات" , "ویرایش مقاله"];
  }

     if (pathname.startsWith("/article/addarticle")){
    items = ["خانه", "لیست مقالات" , "افزودن مقاله" ];
  }

  if (pathname.startsWith("/cycle/")){
    items = ["خانه", "لیست افراد" , "لیست سیکل ها" ];
  }

 if (pathname.startsWith("/note/editnote/")){
    items = ["خانه", "لیست نکات" , "ویرایش نکته" ];
  }

   if (pathname.startsWith("/note/addnote")){
    items = ["خانه", "لیست نکات" , "افزودن نکته" ];
  }

  return (
    <div className="flex w-full flex-col">
      <Header />
      <Nav items={items} />
    </div>
  );
}
