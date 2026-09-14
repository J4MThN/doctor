"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PointImageSlider from "./NoteEditefile/PointImageSlider";
import PointForm from "./NoteEditefile/PointForm";
import DeleteImageModal from "./ModalPoint/DeleteImageModal";
import IconSelectModal from "./ModalPoint/IconSelectModal";
import { usePointImages } from "../../../hook/usePointImages";
import { usePointIcon } from "../../../hook/usePointIcon";
import { usePointById } from "../../../hook/usePointById";
import { useEditNote } from "../../../hook/useEditNote";
import SuccessToast from "../../Toast/SuccessToast";
import ErrorToast from "../../Toast/ErrorToast";

interface EditPointProps {
  id: string;
}

export default function EditPoint({ id }: EditPointProps) {
  const router = useRouter();

  const { note, loading, error } = usePointById(id);

  if (loading) {
    return (
      <div dir="rtl" className="flex w-full flex-1 items-center justify-center">
        <span className="text-[14px] text-[#606060]">
          در حال دریافت اطلاعات...
        </span>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div dir="rtl" className="flex w-full flex-1 items-center justify-center">
        <span className="text-[14px] text-[#606060]">
          نکته مورد نظر پیدا نشد.
        </span>
      </div>
    );
  }

  return (
    <EditNote point={note} pointId={id} onCancel={() => router.push("/note")} />
  );
}

interface EditNoteProps {
  point: any;
  pointId: string;
  onCancel: () => void;
}

function EditNote({ point, pointId, onCancel }: EditNoteProps) {
  const router = useRouter();

  const [title, setTitle] = useState(point.title);
  const [desc, setDesc] = useState(point.desc);

  const { updateNote, loading: updateLoading } = useEditNote();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("خطا در ویرایش نکته.");

  const {
    images,
    selectedImage,
    deleteImage,
    thumbnailStart,

    handleSelectImage,
    handlePrevImages,
    handleNextImages,
    handleAddImage,
    handleDeleteImage,

    setDeleteImage,
  } = usePointImages(point.id, point.images);

  const {
    selectedIcon,
    selectedIconName,

    handleOpenIconModal,
    handleSelectIcon,
  } = usePointIcon(point);

  const handleSubmit = async () => {
     await new Promise((resolve) => setTimeout(resolve, 0));

    if (!title.trim()) {
      setErrorMessage("لطفاً عنوان نکته را وارد کنید.");
      setShowError(true);
      return;
    }

    if (!desc.trim()) {
      setErrorMessage("لطفاً توضیحات نکته را وارد کنید.");
      setShowError(true);
      return;
    }

    const success = await updateNote(Number(pointId), {
      id: point.id,
      icon: selectedIcon ?? point.icon,
      title: title.trim(),
      desc: desc.trim(),
      createDate: point.createDate,
      images: [],
    });

    if (success) {
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/admin/note");
      }, 1000);
    } else {
      setShowError(true);
    }
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
              ویرایش نکته
            </span>
            <PointForm
              title={title}
              desc={desc}
              iconName={selectedIconName}
              hasIcon={!!selectedIcon}
              onIconClik={handleOpenIconModal}
              onIconChange={handleSelectIcon}
              onTitleChange={setTitle}
              onDescChange={setDesc}
              onSubmit={handleSubmit}
              onCancel={onCancel}
              loading={updateLoading}
            />
          </div>

          <div>
            <span className="text-[16px] font-bold text-[#6666C6]">عکس ها</span>
            <PointImageSlider
              images={images}
              selectedImage={selectedImage}
              thumbnailStart={thumbnailStart}
              onSelectImage={handleSelectImage}
              onPrev={handlePrevImages}
              onNext={handleNextImages}
              onDelete={setDeleteImage}
              onAddImage={handleAddImage}
            />
          </div>
        </div>
      </div>

      {deleteImage && (
        <DeleteImageModal
          onConfirm={handleDeleteImage}
          onCancel={() => setDeleteImage(null)}
        />
      )}

      {/* {isIconModalOpen && (
        <IconSelectModal
          currentIcon={point.icon}
          icons={availableIcons}
          selectedIcon={tempIcon}
          onSelect={handleSelectIcon}
          onConfirm={handleConfirmIcon}
          onCancel={handleCancelIcon}
        />
      )} */}

      <SuccessToast
        open={showSuccess}
        message="نکته با موفقیت ویرایش شد."
        onClose={() => setShowSuccess(false)}
      />

      <ErrorToast
        open={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </div>
  );
}
