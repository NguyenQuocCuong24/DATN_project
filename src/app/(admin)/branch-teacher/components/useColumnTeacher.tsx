import { GridColDef } from "@mui/x-data-grid";

type TPageSeo = {
  deletePageSeo: (id: string, code: string) => Promise<void>;
};

const useColumnTeacher = (props: TPageSeo) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Giáo viên",
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
      field: "email",
      headerName: "Gmail",
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
      field: "adress",
      headerName: "Địa chỉ",
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
    {
      field: "specialization",
      headerName: "Môn học",
      headerAlign: "left",
      align: "left",
      width: 144,
    },
  ];

  return columns;
};

export default useColumnTeacher;