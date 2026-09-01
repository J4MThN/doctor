import { ListDailySymptoms } from "@/src/modules/Admin/pages/ListDailySymptoms/ListDailySymptoms";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ListDailySymptoms id={id} />;
};

export default page;
