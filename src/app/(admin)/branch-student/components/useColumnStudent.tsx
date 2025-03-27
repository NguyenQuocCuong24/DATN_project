import { GridColDef } from "@mui/x-data-grid";

type TPageSeo = {
  deletePageSeo: (id: string, code: string) => Promise<void>;
};

const useColumnStudent = (props: TPageSeo) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Tên học sinh",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Tuổi",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "parents",
      headerName: "Phụ huynh ",
      headerAlign: "left",
      align: "left",
      width: 250,
    },
    {
      field: "date",
      headerName: "Ngày sinh",
      headerAlign: "left",
      align: "left",
      width: 250,
    },
    {
      field: "contact",
      headerName: "Liên hệ",
      headerAlign: "left",
      align: "left",
      width: 144,
    },
    {
      field: "class",
      headerName: "Lớp",
      headerAlign: "left",
      align: "left",
      width: 144,
    },
  ];

  return columns;
};

export default useColumnStudent;