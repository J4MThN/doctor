import { EditPoint } from "@/src/modules/Admin/components/Point/EditPoint/EditPoint";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const {id} = await params;
  return (
    <EditPoint id={id}/>
  );
};

export default page;
