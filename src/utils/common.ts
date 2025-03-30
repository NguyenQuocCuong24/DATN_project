import { toast } from "react-toastify";
// import errorCodeVi from "@/errorCodeVi.json";
// import errorCodeEn from "@/errorCodeEn.json";
import dayjs from "dayjs";
import slugify from "slugify";

type ErrorCodeMap = {
  [key: string]: string;
};

export const handleErrorCode = (error: any) => {
  const errorMessage = error?.code || error?.message || "Có lỗi xảy ra";
  // const locale = getCookieValue("NEXT_LOCALE");
  const locale = "vi";
  // const errorCode: ErrorCodeMap = locale === "vi" ? errorCodeVi : errorCodeEn;
  // toast.error(errorCode[error?.code || ""] ?? errorMessage);
};

export function getCookieValue(cookieKey: string): string | null {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${cookieKey}=`));
  return cookies ? cookies.split("=")[1] : null;
}


export function convertToKebabCase(input: string): string {
  return input
    .toLowerCase() // Chuyển toàn bộ chuỗi thành chữ thường
    .normalize("NFD") // Chuẩn hóa ký tự Unicode, tách dấu ra khỏi chữ cái
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự không hợp lệ (chỉ giữ chữ cái, số, dấu cách và dấu gạch ngang)
    .trim() // Xóa khoảng trắng ở đầu và cuối chuỗi
    .replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch ngang
}

export function extractJsonFromScript(input: string = ""): string {
  // Loại bỏ thẻ <script> mở và đóng
  return input
    .replace(/<script[^>]*>/, "") // Loại bỏ thẻ mở <script>
    .replace(/<\/script>/, "") // Loại bỏ thẻ đóng </script>
    .trim(); // Xóa khoảng trắng thừa
}

export const buildQueryString = (queryParam: any): string => {
  const params = new URLSearchParams();
  for (const key in queryParam) {
    if (queryParam.hasOwnProperty(key)) {
      params.append(key, queryParam[key] as string);
    }
  }
  return `${params.toString()}`;
};

export function sanitizeDateTime(dateTime: string) {
  const parsedDate = dayjs(dateTime);

  if (!parsedDate.isValid() || Math.abs(parsedDate.year()) > 9999) {
    return null;
  }

  return dateTime;
}

export const convertSlugUrl = (slug: string) => {
  if (slug === undefined || slug === null) return "";

  // Kiểm tra xem chuỗi ban đầu có kết thúc bằng dấu '-'
  const endsWithDash = slug.endsWith("-");

  // Xử lý slug bằng slugify
  let formattedSlug = slugify(slug, {
    lower: true,
    locale: "vi",
  });

  // Nếu chuỗi ban đầu kết thúc bằng '-', thêm lại nó vào cuối
  if (endsWithDash) {
    formattedSlug += "-";
  }

  return formattedSlug;
};


export const convertGender = (gender : number) => {
    if (gender == 0) {
        return 'Nam';
    }
    return 'Nữ';
}