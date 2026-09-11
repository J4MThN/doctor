// src/core/utils/media.util.ts

export const getMediaUrl = (path: string): string => {
  if (!path) return "";

  // اگه از قبل URL کامل بود (http/https)، دست نزن
  if (path.startsWith("http")) return path;

  // ENV.API_BASE_URL چیزی مثل https://fedialife.ir/api هست
  // ولی فایل‌های استاتیک از ریشه‌ی دامنه (بدون /api) سرو می‌شن
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/?$/, "");

  return `${baseUrl}${path}`;
};