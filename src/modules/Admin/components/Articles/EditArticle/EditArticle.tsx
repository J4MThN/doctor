import { article } from "../../../data/users";

interface EditeProps {
  id: string;
}

export const EditArticle = ({ id }: EditeProps) => {

  const selectArticle = article.find((item) => String(item.key) === id);

  return (
<>عنوان :  {selectArticle?.title}</>
  );
};
