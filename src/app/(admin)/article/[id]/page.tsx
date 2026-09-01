import { EditArticle } from "@/src/modules/Admin/components/Articles/EditArticle/EditArticle";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const {id} = await params;
  return (
    <EditArticle id={id}/>
  );
};

export default page;
