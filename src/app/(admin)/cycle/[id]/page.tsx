import { ListCycleid } from "@/src/modules/Admin/components/Cycle/ListCycleid/ListCycleid";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ListCycleid id={id} />;
};

export default page;
