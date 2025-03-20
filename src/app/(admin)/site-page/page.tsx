"use client";
import { StyledButtonPrimary } from "@/styles/style-common";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useColumnPageSeo from "./_components/useColumnPageSeo";


const SitePageManagement = () => {
  const columns = useColumnPageSeo({ deletePageSeo: async () => { } });

  return (
    <Box className="bg-white m-5 p-8 rounded-2xl">
      {/* Phần Tạo Trang */}
      <Box className="flex gap-10 items-end mb-5">
        <StyledButtonPrimary
          startIcon={<AddIcon />}
          className="w-40 !mr-20 h-[50px]"
          onClick={() => {
            // Xử lý tạo trang
          }}
        >
          Tạo trang
        </StyledButtonPrimary>
      </Box>

      {/* Hiển thị Form bên dưới */}
      <DataGrid
        rows={[]} // Không có dữ liệu
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default SitePageManagement;
