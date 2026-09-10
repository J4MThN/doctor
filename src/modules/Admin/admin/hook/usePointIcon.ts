"use client";

import { useState } from "react";
import { points } from "../data/users";

export interface IconOption {
  id: string;
  name: string;
  icon: any;
}

export function usePointIcon(point: any) {
  const availableIcons: IconOption[] = points
    .filter((item) => item.icon)
    .map((item) => ({
      id: String(item.key),
      name: item.iconName ?? "",
      icon: item.icon,
    }));

  const currentIcon =
    availableIcons.find((item) => item.icon === point.icon) ?? null;

  const [selectedIcon, setSelectedIcon] = useState<IconOption | null>(
    currentIcon,
  );

  const [selectedIconName, setSelectedIconName] = useState(
    point.iconName ?? "",
  );

  const [isIconModalOpen, setIsIconModalOpen] = useState(false);

  const [tempIcon, setTempIcon] = useState<IconOption | null>(currentIcon);

  const handleOpenIconModal = () => {
    setTempIcon(selectedIcon);
    setIsIconModalOpen(true);
  };

  const handleSelectIcon = (icon: IconOption) => {
    setTempIcon(icon);
  };

  const handleConfirmIcon = () => {
    if (!tempIcon) return;

    setSelectedIcon(tempIcon);
    setSelectedIconName(tempIcon.name);

    setIsIconModalOpen(false);
  };

  const handleCancelIcon = () => {
    setTempIcon(selectedIcon);
    setIsIconModalOpen(false);
  };

  return {
    availableIcons,
    currentIcon,

    selectedIcon,
    selectedIconName,

    tempIcon,
    isIconModalOpen,

    handleOpenIconModal,
    handleSelectIcon,
    handleConfirmIcon,
    handleCancelIcon,
  };
}
