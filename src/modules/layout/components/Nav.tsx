interface NavProps {
  title: string;
  isEditList?: boolean;
}

export default function Nav({ title, isEditList = false }: NavProps) {
  return (
    <div className="flex w-full h-7.5 text-[12px] bg-[#F9F9FB] items-center pr-4 mt-2">
      <span
        className={` text-[#1C2024] mt-1 ml-1 ${isEditList ? "text-[#aeaeb2]" : "text-[#606060]"}`}
      >
        {" "}
        خانه{" "}
      </span>
      <span className="text-[#4d4d4d] mt-1 ml-1"> / </span>

      {isEditList && (
        <>
          <span
            className={`flex text-[#1C2024] mt-1 ml-1 ${isEditList ? "text-[#aeaeb2]" : "text-[#606060]"}`}
          >
            {" "}
            لیست مقالات{" "}
          </span>
          <span className="mt-1 text-[#4d4d4d] ml-1"> / </span>
        </>
      )}

      <span className="mt-1 text-[#1C2024] ml-1"> {title}</span>
    </div>
  );
}
