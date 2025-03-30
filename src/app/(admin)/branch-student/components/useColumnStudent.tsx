import { convertGender } from "@/utils/common";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

type TPageSeo = {
  deletePageSeo: (id: string, code: string) => Promise<void>;
};

const useColumnStudent = (props: TPageSeo) => {
  const columns: GridColDef[] = [
    {
      field: "FullName",
      headerName: "Tên học sinh",
      headerAlign: "left",
      align: "left",
      flex: 1,
      width: 250,
    },
    {
      field: "ParentName",
      headerName: "Phụ huynh ",
      headerAlign: "left",
      align: "left",
      width: 250,
    },
    {
      field: "ParentPhone",
      headerName: "Số điện thoại Phụ huynh ",
      headerAlign: "left",
      align: "left",
      width: 144,
    },
    {
      field: "DateOfBirth",
      headerName: "Ngày sinh",
      headerAlign: "left",
      align: "left",
      width: 250,
      valueGetter: (params) => {
        return params ? dayjs(params).format("DD/MM/YYYY") : "";
      },
    },
    {
      field: "Address",
      headerName: "Địa chỉ",
      headerAlign: "left",
      align: "left",
      width: 144,
    },
    {
      field: "ClassID",
      headerName: "Lớp",
      headerAlign: "left",
      align: "left",
      width: 144,
    },
    {
      field: "Gender",
      headerName: "Giới tính",
      headerAlign: "left",
      align: "left",
      width: 144,
      valueGetter: (params) => {
        return convertGender(params);
      },
    },

  ];

  return columns;
};

export default useColumnStudent;