import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
export const convertDateTime = (dateString: string) => {
  const dateUtc = dayjs.utc(dateString);
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = dateUtc.tz(localTimeZone);
  return localTime.format("DD/MM/YYYY - HH:mm:ss");
};

export const convertDate = (params: string): string => {
  if (!params) return "";
  const dateUtc = dayjs.utc(params);
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = dateUtc.tz(localTimeZone);
  return localTime.format("DD/MM/YYYY");
};

export const formatDateToUtc = (dateString: string) => {
  const dateUtc = dayjs.utc(dateString);
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = dateUtc.tz(localTimeZone);
  return localTime;
};
export const convertTimestamp = (timestamp: number) => {
  if (!timestamp) return "";
  return dayjs(timestamp).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
};

export const convertStringToDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const normalizedDate = dateString.replace(/-/g, "/");
  
  const parsedDate = dayjs(normalizedDate, "DD/MM/YYYY", true);
  
  return parsedDate.isValid() ? parsedDate.toDate() : null;
};
