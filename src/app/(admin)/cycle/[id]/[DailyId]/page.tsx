import { ListDaily } from "@/src/modules/Admin/components/Cycle/ListDaily/ListDaily";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; DailyId: string }>;
}) => {
  const { id, DailyId } = await params;
  return (
    <div className="flex w-full flex-1 min-h-0 bg-white">
      <div className=" w-full min-h-0 m-6 rounded-3xl bg-[#F9F9FB]">
        <div className="flex mt-4 mr-6 font-bold text-[#6666C6]">
          <span className="text-[16px] ml-2"> لیست علائم روزانه </span>
          <span className="text-[16px] ml-2"> لیست علائم روزانه </span>
        </div>
        <div className="mx-4 mt-4">
          <ListDaily id={id} cycleId={DailyId} />
        </div>{" "}
      </div>
    </div>
  );
};

export default page;
