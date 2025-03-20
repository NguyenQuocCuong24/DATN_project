"use client";
import { usePageStore } from "@/stores/pageStores";
import Typography from "@mui/material/Typography";
import StepBasicSetting from "../StepperPage/StepBasicSetting";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Box from "@mui/material/Box";
const TabBanner = ({ isPost }: { isPost?: boolean }) => {
  const { isSelectedPage } = usePageStore();
  return isSelectedPage && isSelectedPage?.data ? (
    <StepBasicSetting
      type='tab'
      bodyData={isSelectedPage.data}
      isPost={isPost}
    />
  ) : (
    <Box className='flex flex-col items-center justify-center h-96 text-grayInfor'>
      <NewspaperIcon fontSize='large' />
      <Typography variant='subtitle1'>
        Thông tin không có sẵn cần chọn trang
      </Typography>
    </Box>
  );
};

export default TabBanner;
