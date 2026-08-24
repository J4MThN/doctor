import Link from "next/link";
import Prof from "@/src/assest/profdoctor/nody-عکس-پزشکی-1633070672.webp";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w">
          <div className="bg-white border-[#E5E5EA] flex items-center ">
            <Image
              className="w-12 h-12 rounded-4xl "
              src={Prof}
              alt="AboutUsPic"
            />
            <span className="pr-2 font-black text-base">دکتر مرضیه برومند</span>
          </div>
          <div className="flex items-center lg:order-2">
            <div className=" border-2 border-[#E5E5EA] w-12 h-12 rounded-4xl ml-2"></div>
            <div className=" border-2 border-[#E5E5EA] w-12 h-12 rounded-4xl"></div>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium lg:flex-row lg:space-x-4 lg:mt-0 text-center">
              <li className="w-33.75 h-12 border-2 border-[#F2F2F7] rounded-4xl">
                <Link href="#" className="text-sm text-[#80838D] ">
                  داشبورد
                </Link>
              </li>
              <li className="w-33.75 h-12 border-2 border-[#FF657D] rounded-4xl">
                <Link
                  href="#"
                  className="text-base font-black text-[#1C2024] dark:text-white"
                  aria-current="page"
                >
                  لیست سیکل ها
                </Link>
              </li>
              <li className="w-31.5 h-12 border-2 border-[#F2F2F7] rounded-4xl">
                <Link href="#" className="text-sm text-[#80838D] ">
                  لیست بارداری ها
                </Link>
              </li>
              <li className="w-23 h-12 border-2 border-[#F2F2F7] rounded-4xl">
                <Link href="#" className="text-sm text-[#80838D] ">
                  نکات امروز
                </Link>
              </li>
              <li className="w-18.25 h-12 border-2 border-[#F2F2F7] rounded-4xl">
                <Link href="#" className="text-sm text-[#80838D] ">
                  مقالات
                </Link>
              </li>
              <li className="w-26.5 h-12 border-2 border-[#F2F2F7] rounded-4xl">
                <Link href="#" className="text-sm text-[#80838D]  ">
                  لیست نظرات
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
