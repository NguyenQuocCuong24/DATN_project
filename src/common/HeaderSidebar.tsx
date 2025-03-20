"use client";
import { ColorCommon } from "@/constants/color-common";
import { Avatar, Box, Divider, Typography } from "@mui/material";
export interface IHeaderSidebarProps {
  username: string;
  fullName: string;
}

export default function HeaderSidebar(props: IHeaderSidebarProps) {
  const { username, fullName } = props;
  return (
    <Box>
      <Divider
        className='w-full'
        component='div'
        sx={{
          "&.MuiDivider-root": {
            backgroundColor: ColorCommon.grayMiddle,
            opacity: 0.1,
          },
        }}
      />
      <Box className='pl-4 py-4'>
        <Box className='flex ml-2 items-center'>
          <Avatar alt='account' sx={{ width: 34, height: 34, mr: 1 }} />
          <Box>
            <Typography className='!font-manrope text-grayLight text-small text-primary'>
              {fullName}
            </Typography>
            <Typography className='!font-manrope text-grayLight text-small text-primary'>
              {username}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        className='w-full'
        component='div'
        sx={{
          "&.MuiDivider-root": {
            backgroundColor: "#fff",
            opacity: 0.1,
          },
        }}
      />
    </Box>
  );
}
