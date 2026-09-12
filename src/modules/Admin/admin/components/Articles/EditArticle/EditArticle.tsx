"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArticleImage from "./NewsEditefile/ArticleImage";
import ArticleForm from "./NewsEditefile/ArticleForm";
import DeletImageModalArticle from "./ModalArticle/DeletImageModalArticle";
import { useArticleImage } from "../../../hook/useArticleImage";

import { useEditArticle } from "../../../hook/useEditArticle";
import { article } from "../../../data/users";
import ErrorToast from "../../Toast/ErrorToast";
import SuccessToast from "../../Toast/SuccessToast";

interface EditArticleProps {
  id: string;
}

export default function EditArticle({ id }: EditArticleProps) {
  const { article: apiArticle, loading, error, getArticle } = useEditArticle();

  useEffect(() => {
    getArticle(Number(id));
  }, [id]);

  const router = useRouter();

  if (!apiArticle) {
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
      articleData={apiArticle}
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

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!articleData) return;

    setTitle(articleData.title ?? "");
    setDesc(articleData.desc ?? "");
    setSubject(
      articleData.type === "Public"
        ? "عمومی"
        : articleData.type === "Private"
          ? "تخصصی"
          : (articleData.subject ?? ""),
    );
  }, [articleData]);

  const {
    image: uploadedImage,
    uploading,
    error: imageError,
    uploadImage,
  } = useArticleImage();

  const { updateArticle, loading: updateLoading } = useEditArticle();

  // کد اضافه شده برای ارسال ویرایش به API
  const handleApiSubmit = async () => {
    const success = await updateArticle(Number(articleId), {
      title,
      desc,
      type: subject === "عمومی" ? "Public" : "Private",
      categoryId: articleData.categoryId,
      timeRead: articleData.timeRead,
    });

    if (success) {
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/admin/article");
      }, 2000);
    } else {
      setShowError(true);
    }
  };

  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const handleAddImage = (file: File) => {
    uploadImage(Number(articleId), file);
  };

  const handleDeleteImage = () => {
    setIsDeleted(true);
    setDeleteImage(false);
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
              onSubmit={handleApiSubmit}
              onCancel={onCancel}
            />
          </div>
          <div>
            <span className="text-[16px] font-bold text-[#6666C6]">عکس </span>
            <ArticleImage
              image={uploadedImage ?? articleData.imagePath}
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
      <SuccessToast
        open={showSuccess}
        message="مقاله با موفقیت ویرایش شد."
        onClose={() => setShowSuccess(false)}
      />

      <ErrorToast
        open={showError}
        message="خطا در ویرایش مقاله."
        onClose={() => setShowError(false)}
      />
    </div>
  );
}
