"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { article } from "@/src/modules/Admin/data/users";
import ArticleImage from "./NewsEditefile/ArticleImage";
import ArticleForm from "./NewsEditefile/ArticleForm";
import DeletImageModalArticle from "./ModalArticle/DeletImageModalArticle";
import { useArticleImage } from "../../../hook/useArticleImage";

interface EditArticleProps {
  id: string;
}

export default function EditArticle({ id }: EditArticleProps) {
  const router = useRouter();

  const selectedArticle = article.find(
    (item) => String(item.key) === String(id),
  );
  if (!selectedArticle) {
    return (
      <div dir="rtl" className="flex w-full flex-1 items-center justify-center">
        <span className="text-[14px] text-[#606060]">
          مقاله مورد نظر پیدا نشد.
        </span>
      </div>
    );
  }

  return (
    <EditArticleForm
      articleData={selectedArticle}
      articleId={id}
      onCancel={() => router.push("/article")}
    />
  );
}

interface EditArticleFormProps {
  articleData: any;
  articleId: string;
  onCancel: () => void;
}

function EditArticleForm({
  articleData,
  articleId,
  onCancel,
}: EditArticleFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(articleData.title);
  const [desc, setDesc] = useState(articleData.desc);
  const [subject, setSubject] = useState(articleData.subject);
  const {
    image,
    isDeleted,
    deleteImage,
    handleAddImage,
    handleDeleteImage,
    setDeleteImage,
  } = useArticleImage(articleId);

  const handleSubmit = () => {
    const index = article.findIndex(
      (item) => String(item.key) === String(articleId),
    );
    if (index === -1) return;
    article[index] = {
      ...article[index],
      title,
      desc,
      subject,
      icon: image,
    };
    router.push("/article");
  };

  return (
    <div
      dir="rtl"
      className="w-full flex-1 min-h-0 m-6 rounded-3xl bg-[#F9F9FB]"
    >
      <div className="mt-4 mr-6">
        <div className="flex gap-20">
          <div>
            <span className="text-[16px] font-bold text-[#6666C6]">
              ویرایش مقاله
            </span>
            <ArticleForm
              title={title}
              subject={subject}
              desc={desc}
              onTitleChange={setTitle}
              onSubjectChange={setSubject}
              onDescChange={setDesc}
              onSubmit={handleSubmit}
              onCancel={onCancel}
            />
          </div>
          <div>
            <span className="text-[16px] font-bold text-[#6666C6]">عکس </span>
            <ArticleImage
              image={image}
              isDeleted={isDeleted}
              onDelete={() => setDeleteImage(true)}
              onAddImage={handleAddImage}
            />
          </div>
        </div>
      </div>
      {deleteImage && (
        <DeletImageModalArticle
          onConfirm={handleDeleteImage}
          onCancel={() => setDeleteImage(false)} /*  */
        />
      )}
    </div>
  );
}
