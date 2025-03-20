import { ColorCommon } from "@/constants/color-common";

export type pageInfo = {
  page: number;
  itemPerPage: number;
  total: number;
};
export type TDefaultFormType = "view" | "create" | "update" | "delete";
export type LayoutDirections = "horizontal" | "vertical";
export type Size = "small" | "medium";
export type TDefaultStatusType = "Active" | "Pending";
export const mapColorDefaultStatus: Record<TDefaultStatusType, string> = {
  Active: ColorCommon.success,
  Pending: ColorCommon.boxRed,
};
export const ListStatusDefault = ["Active", "Pending"];
