import { UserProfileDto, Users } from "../types";

const normalizeDigits = (value: string): string => {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
};

const calculateAge = (birthDate: string): number => {
  if (!birthDate) {
    return 0;
  }

  const normalized = normalizeDigits(birthDate);
  const parts = normalized.split("/");

  if (parts.length !== 3) {
    return 0;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!year || !month || !day) {
    return 0;
  }

  const todayParts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());

  const currentYear = Number(
    todayParts.find((part) => part.type === "year")?.value,
  );

  const currentMonth = Number(
    todayParts.find((part) => part.type === "month")?.value,
  );

  const currentDay = Number(
    todayParts.find((part) => part.type === "day")?.value,
  );

  let age = currentYear - year;

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age--;
  }

  return Math.max(age, 0);
};

const translateMaritalStatus = (status: string | number): string => {
  const normalized = normalizeDigits(String(status)).trim().toLowerCase();

  switch (normalized) {
    case "0":
    case "single":
      return "مجرد";

    case "1":
    case "married":
      return "متاهل";

    case "2":
    case "widowed":
      return "بیوه";

    case "3":
    case "divorced":
      return "مطلقه";

    default:
      return "نامشخص";
  }
};

export const mapUserToTable = (
  user: UserProfileDto,
  totalUsers: number,
): Users => {
  return {
    key: String(user.id),
    name: `${user.firstName} ${user.lastName}`,
    mobile: user.mobile,
    age: calculateAge(user.birthDate),
    maritalStatus: translateMaritalStatus(user.maritalStatus),
    cycleCount: user.cycleCount,
  };
};
