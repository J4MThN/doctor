import { UserProfileDto, Users } from "../types";

 
const normalizeDigits = (value: string): string => {
  return value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    );
};

const calculateAge = (birthDate: string): number => {
  if (!birthDate) {
    return 0;
  }

  const normalized = normalizeDigits(birthDate);

  const [year, month, day] = normalized
    .split("/")
    .map(Number);

  if (!year || !month || !day) {
    return 0;
  }

  const today = new Date();

  const todayParts = new Intl.DateTimeFormat(
    "en-US-u-ca-persian",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  ).formatToParts(today);

  const currentYear = Number(
    todayParts.find(
      (part) => part.type === "year"
    )?.value
  );

  const currentMonth = Number(
    todayParts.find(
      (part) => part.type === "month"
    )?.value
  );

  const currentDay = Number(
    todayParts.find(
      (part) => part.type === "day"
    )?.value
  );

  let age = currentYear - year;

  if (
    currentMonth < month ||
    (currentMonth === month && currentDay < day)
  ) {
    age--;
  }

  return Math.max(age, 0);
};

const translateMaritalStatus = (
  status: string
): string => {
  switch (status.toLowerCase()) {
    case "single":
      return "مجرد";

    case "married":
      return "متاهل";

    case "widowed":
      return "همسر فوت شده";

    case "divorced":
      return "مطلقه";

    default:
      return status;
  }
};

export const mapUserToTable = (
  user: UserProfileDto,
  totalUsers: number
): Users => {
  return {
    key: String(user.id),

    name: `${user.firstName} ${user.lastName}`,

    mobile: user.mobile,

    age: calculateAge(user.birthDate),

    maritalStatus: translateMaritalStatus(
      user.maritalStatus
    ),

    // فعلاً طبق درخواست شما:
    // تعداد سیکل = تعداد کل کاربران
    cycleCount: totalUsers,
  };
};