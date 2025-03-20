"use client";

import { usePageStore } from "@/stores/pageStores";
import StepSeoAdvanced from "../StepperPage/StepSeoAdvanced";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const TabSeoAdvanced = () => {
  const { isSelectedPage, kindOfPage } = usePageStore();
  return isSelectedPage && isSelectedPage?.data ? (
    <StepSeoAdvanced type='tab' bodyData={isSelectedPage.data} />
  ) : (
    <Box className='flex flex-col items-center justify-center h-96 text-grayInfor'>
      <NewspaperIcon fontSize='large' />
      <Typography variant='subtitle1'>
        {kindOfPage === "post" || kindOfPage === "product"
          ? "Bài viết hiện tại không có SEO"
          : "Thông tin không có sẵn cần chọn trang"}
      </Typography>
    </Box>
  );
};

export default TabSeoAdvanced;
