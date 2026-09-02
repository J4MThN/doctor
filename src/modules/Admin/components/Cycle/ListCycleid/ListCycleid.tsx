import { cycle, dailySymptom, user } from "../../../data/users";
import TableListCycleid from "../TableCycle/TableListCycleid";

interface ListProps {
  id: string;
}

export const ListCycleid = ({ id }: ListProps) => {
  const selectArticle = user.find((item) => String(item.key) === id);

  return (
    <div className=" w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
      <div className="flex mt-4 mr-6 font-bold text-[#6666C6]">
        <span className="text-[16px] ml-2 "> لیست سیکل ها </span>
        <span className="text-[14px] ml-2 text-[#FF657D] font-normal pt-1">({selectArticle?.name})</span>
        <div className="flex items-center justify-center border border-[#6666C6] bg-[#F2F2FF] w-6 h-6 rounded-4xl">
          <span className="text-[12px] pt-0.5">{dailySymptom.length}</span>
        </div>
      </div>
      <div className="mx-4 mt-4"> <TableListCycleid userId={id}/> </div>
    </div>
  );
};
