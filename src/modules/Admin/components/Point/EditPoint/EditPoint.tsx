"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { points } from "@/src/modules/Admin/data/users"

import PointImageSlider from "./NoteEditefile/PointImageSlider";
import PointForm from "./NoteEditefile/PointForm";
import DeleteImageModal from "./Modals/DeleteImageModal";
import IconSelectModal from "./Modals/IconSelectModal";
import { usePointImages } from "../../../hook/usePointImages";
import { usePointIcon } from "../../../hook/usePointIcon";


interface EditPointProps {
  id: string;
}

interface IconOption {
  id: string;
  name: string;
  icon: any;
}

export default function EditPoint({ id }: EditPointProps) {
  const router = useRouter();

  const selectedPoint = points.find((item) => String(item.key) === String(id));

  if (!selectedPoint) {
    return (
      <div dir="rtl" className="flex w-full flex-1 items-center justify-center">
        <span className="text-[14px] text-[#606060]">
          نکته مورد نظر پیدا نشد.
        </span>
      </div>
    );
  }

  return (
    <EditNote
      point={selectedPoint}
      pointId={id}
      onCancel={() => router.push("/note")}
    />
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
} = usePointImages(pointId);

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
    const index = points.findIndex(
      (item) => String(item.key) === String(pointId),
    );
    if (index === -1) return;

    points[index] = {
      ...points[index],
      icon: selectedIcon?.icon,
      iconName: selectedIcon?.name ?? "",

      title,/*  */
      desc,
      image: images.length,
    };

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
