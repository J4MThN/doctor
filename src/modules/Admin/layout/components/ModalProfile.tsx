"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Camera01Icon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";
import { useUserProfile } from "../../admin/hook/useUserProfile";
import { UpdateUserProfileDto } from "../../admin/types";
import Prof from "@/src/assest/profdoctor/nody-عکس-پزشکی-1633070672.webp";
import Image from "next/image";

interface ModalProfileProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalProfile({ open, onClose }: ModalProfileProps) {
  const { user, loading, updating, error, updateUserProfile } =
    useUserProfile();

  const [form, setForm] = useState<UpdateUserProfileDto>({
    firstName: "",
    lastName: "",
    birthDate: "",
    maritalStatus: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      birthDate: user.birthDate ?? "",
      maritalStatus: user.maritalStatus ?? "",
    });
  }, [user]);

  if (!open) return null;
  const handleChange = (field: keyof UpdateUserProfileDto, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const success = await updateUserProfile(form);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        dir="rtl"
        className="relative w-full max-w-237 rounded-3xl bg-white px-8 py-6 shadow-xl"
      >
        <div className="flex justify-between items-center mb-6 mt-2">
          <h2 className="text-[16px] font-black text-[#1C2024] mr-2">
            ویرایش پروفایل
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 cursor-pointer"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={24}
              color="#FF657D"
              strokeWidth={2}
            />
          </button>
        </div>
        <div className="grid grid-cols-[280px_1fr] gap-6">
          <div className="rounded-2xl border border-[#F3F2F2] px-5 py-5 bg-[#F9F9FB]">
            <div className="mb-5 text-[14px] font-bold text-[#4D4D4D]">
              عکس پروفایل
            </div>

            <div className="flex flex-col items-center mt-8">
              <div className="relative w-28 h-28 border-2 border-[#6666C6] rounded-full">
                {/* عکس API نداریم */}
                <Image
                  src={Prof}
                  alt="AboutUsPic"
                  width={48}
                  height={48}
                  className="w-28 h-28 rounded-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 left-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#6666C6]"
                >
                  <HugeiconsIcon
                    icon={Camera01Icon}
                    size={20}
                    strokeWidth={1.5}
                    color="white"
                  />
                </button>
              </div>
              <div className="mt-8 text-center">
                <div className="text-[17px] font-black text-[#1C2024]">
                  {loading
                    ? "در حال بارگذاری..."
                    : `دکتر ${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                </div>
                <div className="mt-4 text-[12px] text-[#80838D] flex items-center">
                  تاریخ عضویت :{" "}
                  <div className="text-[12px] font-medium text-[#4D4D4D] pr-1">
                    {user?.createDate
                      ? new Date(user.createDate).toLocaleDateString("fa-IR")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#F3F2F2] px-5 py-5 bg-[#F9F9FB]">
            <div className="mb-5 text-[14px] font-bold text-[#4D4D4D]">
              اطلاعات شخصی
            </div>
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-center text-sm text-red-500">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                  نام
                </label>
                <input
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="text-[#6666C6] h-10 w-full rounded-md border border-[#6666C6] font-medium px-3 text-[13px] outline-none focus:border-[#4B4B9B]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                  نام خانوادگی
                </label>
                <input
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="text-[#6666C6] h-10 w-full rounded-md border border-[#6666C6] font-medium px-3 text-[13px] outline-none focus:border-[#4B4B9B]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                  تاریخ تولد
                </label>
                <input
                  value={form.birthDate}
                  onChange={(e) => handleChange("birthDate", e.target.value)}
                  className="text-[#6666C6] h-10 w-full rounded-md border border-[#6666C6] font-medium px-3 text-[12px] outline-none focus:border-[#4B4B9B]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                  وضعیت تأهل
                </label>
                <input
                  value={form.maritalStatus}
                  onChange={(e) =>
                    handleChange("maritalStatus", e.target.value)
                  }
                  className="text-[#6666C6] h-10 w-full rounded-md border border-[#6666C6] font-medium px-3 text-[12px] outline-none focus:border-[#4B4B9B]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                  موبایل
                </label>
                <input
                  value={user?.mobile ?? ""}
                  disabled
                  className="h-10 w-full rounded-md border border-[#eeeeee] bg-[#eeeeee] px-3 text-[12px] text-[#80838D]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                  ایمیل
                </label>
                <input
                  value={user?.email ?? ""}
                  disabled
                  className="h-10 w-full rounded-md border border-[#eeeeee] bg-[#eeeeee] px-3 text-[12px] text-[#80838D]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[#F3F2F2] bg-[#F9F9FB] px-5 py-4">
          <div className="mb-4 text-[14px] font-bold text-[#4D4D4D]">
            تغییر پسورد
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                رمز عبور فعلی
              </label>
              <div className="relative">
                <HugeiconsIcon
                  icon={LockPasswordIcon}
                  size={18}
                  color="#80838D"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                />
                <input
                  type="password"
                  placeholder="رمز عبور فعلی"
                  className="h-10 w-full rounded-md border border-[#E5E5EA] px-10 text-[12px] outline-none focus:border-[#4B4B9B]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] text-[#1C2024]">
                رمز عبور جدید
              </label>
              <div className="relative">
                <HugeiconsIcon
                  icon={LockPasswordIcon}
                  size={18}
                  color="#80838D"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                />
                <input
                  type="password"
                  placeholder="رمز عبور جدید"
                  className="h-10 w-full rounded-md border border-[#E5E5EA] px-10 text-[12px] outline-none focus:border-[#4B4B9B]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-36 h-10 rounded-lg border border-[#80838D] text-[#80838D] text-[14px] cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || updating}
            className="w-36 h-10 rounded-lg bg-[#6666C6] text-white text-[14px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updating ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </div>
    </div>
  );
}
