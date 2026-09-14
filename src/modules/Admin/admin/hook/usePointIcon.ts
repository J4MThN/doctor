"use client";

import { useState } from "react";

export function usePointIcon(point: any) {
  const getIconName = (icon: string | null | undefined) => {
    if (!icon) return "";

    const fileName = icon.split("/").pop() ?? "";

    return decodeURIComponent(fileName);
  };

  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);

  const [selectedIconName, setSelectedIconName] = useState(
    getIconName(point.icon),
  );

  const handleOpenIconModal = () => {
    document.getElementById("point-icon-input")?.click();
  };

  const handleSelectIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedIcon(file);
    setSelectedIconName(file.name);

    event.target.value = "";
  };

  return {
    selectedIcon,
    selectedIconName,

    handleOpenIconModal,
    handleSelectIcon,
  };
}
