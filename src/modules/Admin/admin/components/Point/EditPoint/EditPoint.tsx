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
  } = usePointImages(point.images);

  const {
    availableIcons,
    selectedIcon,
    selectedIconName,
    tempIcon,
    isIconModalOpen,

    handleOpenIconModal,
    handleSelectIcon,
    handleConfirmIcon,
    handleCancelIcon,
  } = usePointIcon(point);

  const handleSubmit = () => {
    router.push("/note");
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
              onTitleChange={setTitle}
              onDescChange={setDesc}
              onSubmit={handleSubmit}
              onCancel={onCancel}
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

      {isIconModalOpen && (
        <IconSelectModal
          currentIcon={point.icon}
          icons={availableIcons}
          selectedIcon={tempIcon}
          onSelect={handleSelectIcon}
          onConfirm={handleConfirmIcon}
          onCancel={handleCancelIcon}
        />
      )}
    </div>
  );
}
