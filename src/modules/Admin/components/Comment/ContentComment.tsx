import { points } from "../../data/users";
import TableComment from "./TableComment/TableComment";

export const ContentComment = () => {
  return (
    <div className=" w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
      <div className="flex w-full justify-between mt-4 mr-6 font-bold text-[#6666C6]">
        <div className="flex">
          <span className="text-[16px] ml-2"> نظرات </span>
          <div className="flex items-center justify-center border border-[#6666C6] bg-[#F2F2FF] w-6 h-6 rounded-4xl">
            <span className="text-[12px] pt-0.5">{points.length}</span>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-4">
        <TableComment />
      </div>
    </div>
  );
};
