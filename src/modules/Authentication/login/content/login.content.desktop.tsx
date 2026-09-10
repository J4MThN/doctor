 
"use client";

import { useState } from "react";
import { useLogin } from "../hook/use-login";
import { Button, Input } from "antd";

export function LoginContentDesktop() {
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");

  const { login, isLoading, error } = useLogin();

  const handleLogin = async () => {
    await login(mobile, pin);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="relative w-[56%] h-full shrink-0">
        <img
          src="/login.png"
          alt="Login"
          className="block w-full h-full object-cover absolute inset-0"
        />
      </div>

      <div className="flex flex-1 flex-col w-[44%] justify-center items-center h-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="flex w-full justify-center items-center -mr-6 -mt-6 mb-2">
          <div className="flex mr-3">
            <span className="text-[#000] text-[18px]">
              ورود به پنل مدیریتی
            </span>
          </div>
        </div>

        <div className="flex flex-col w-full mt-10 justify-center items-center">
          {/* Mobile */}
          <div className="flex flex-col w-[60%] justify-center items-start">
            <span className="text-[#000] text-[12px]">
              موبایل
            </span>

            <div className="mt-2 flex w-full">
              <Input
                type="text"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                placeholder="*** *** 0911"
                className="flex text-[#AEAEB2] pt-1 text-left bg-[#F9F9FB] border border-[#E5E5EA] rounded-[6px] !outline-none focus:!border-blue-500 focus:!ring-0 focus:!ring-blue-500 h-[48px] w-full text-[13px] pl-3"
              />
            </div>
          </div>

          {/* PIN */}
          <div className="flex flex-col w-[60%] justify-center items-start mt-3">
            <span className="text-[#000] text-[12px]">
              پین
            </span>

            <div className="mt-2 flex w-full">
              <Input
                type="password"
                value={pin}
                onChange={(event) => setPin(event.target.value)}
                placeholder="****"
                maxLength={6}
                className="flex text-[#AEAEB2] pt-1 text-left bg-[#F9F9FB] border border-[#E5E5EA] rounded-[6px] !outline-none focus:!border-blue-500 focus:!ring-0 focus:!ring-blue-500 h-[48px] w-full text-[13px] pl-3"
              />
            </div>
          </div>

          {/* Login */}
          <div className="flex flex-col w-[60%] justify-center items-start mt-6 mr-[2px]">
            <Button
              loading={isLoading}
              disabled={isLoading}
              className="flex w-full h-[48px] cursor-pointer bg-[#82674D] rounded-[4px] text-[#fff] text-[13px]"
              onClick={handleLogin}
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </Button>

            {error && (
              <p className="mt-3 text-[12px] text-red-500">
                {error.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
