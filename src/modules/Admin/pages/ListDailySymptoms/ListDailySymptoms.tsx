import { ListDaily } from "../../components/Cycle/ListDaily/ListDaily";

interface ListDailySymptomsProps {
  id : string;
}
export const ListDailySymptoms = ({id} : ListDailySymptomsProps) => {
  return (
    <div className="flex w-full flex-1 min-h-0 bg-white">
    <ListDaily id={id}/>
    </div>
  );
};
