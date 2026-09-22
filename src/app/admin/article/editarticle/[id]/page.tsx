import EditArticle from "@/src/modules/Admin/admin/components/Articles/EditArticle/EditArticle";
import { articlesService } from "@/src/modules/Admin/admin/services/articles.service";

export async function generateStaticParams() {
  const articles = await articlesService.getAll();

  return articles.map((article) => ({
    id: String(article.id),
  }));
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EditArticle id={id} />;
};

export default page;
