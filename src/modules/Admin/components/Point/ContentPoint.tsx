import TablePoint from "./TablePoint/TablePoint";

export const ContentPoint = () => {
  return (
    <div className=" w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
      <div className="flex mt-4 mr-4 font-bold text-[#6666C6]">
        <span className="text-[16px] ml-2"> نکات </span>
        <div className="flex items-center justify-center border border-[#6666C6] bg-[#F2F2FF] w-6 h-6 rounded-4xl">
          <span className="text-[12px] mt-1">6</span>
        </div>
      </div>
      <div className="mx-4 mt-4">
      <TablePoint />
      </div>
    </div>
  );
};
