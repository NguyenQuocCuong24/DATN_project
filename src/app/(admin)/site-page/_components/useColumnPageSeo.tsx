import { convertDate } from "@/utils/convertDate";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";

type TPageSeo = {
  deletePageSeo: (id: string, code: string) => Promise<void>;
};

const useColumnPageSeo = (props: TPageSeo) => {
  const { deletePageSeo } = props;
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Tên trang",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "pageCode",
      headerName: "Mã code trang",
      headerAlign: "left",
      align: "left",
      width: 250,
    },
    {
      field: "url",
      headerName: "Đường dẫn trang (slug)",
      headerAlign: "left",
      align: "left",
      width: 250,
    },
    {
      field: "createdDate",
      headerName: "Ngày tạo",
      headerAlign: "left",
      align: "left",
      width: 144,
      renderCell: (params) => convertDate(params.value),
    },
    {
      field: "modifiedDate",
      headerName: "Ngày cập nhật",
      headerAlign: "left",
      align: "left",
      width: 144,
      renderCell: (params) => convertDate(params.value),
    },
    {
      field: "view",
      headerName: "Xem",
      headerAlign: "center",
      align: "center",
      width: 109,
      renderCell: () => (
        <Image src="/assets/icons/icon_view.svg" alt="View" width={23} height={23} />
      ),
    },
    {
      field: "edit",
      headerName: "Sửa",
      headerAlign: "center",
      align: "center",
      width: 109,
      renderCell: () => (
        <Image src="/assets/icons/icon_edit.svg" alt="Edit" width={23} height={23} />
      ),
    },
    {
      field: "delete",
      headerName: "Xóa",
      headerAlign: "center",
      align: "center",
      width: 109,
      renderCell: () => (
        <Image src="/assets/icons/recycle-bin.svg" alt="Delete" width={23} height={23} />
      ),
    },
  ];

  return columns;
};

export default useColumnPageSeo;