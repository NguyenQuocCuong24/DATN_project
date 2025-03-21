"use client";
// import authApiRequest from "@/apiRequests/auth";
import HeaderSidebar from "@/common/HeaderSidebar";
import Sidebar from "@/common/Sidebar";
import { useAccountStore } from "@/stores/accountStores";
import { useHeaderStore } from "@/stores/headerStores";
import { baseMenu } from "@/types/sidebar.type";
import { IInfoUser } from "@/types/user-infor.type";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const Menus: baseMenu[] = [
    {
        id: 1,
        title: "Quản lý các trang chính",
        path: "/",
        subMenu: false,
    },
    {
        id: 2,
        title: "Quản lí học sinh",
        path: "/branch-student",
        subMenu: false,
    },
    {
        id: 3,
        title: "Quản lý giáo viên",
        path: "",
        subMenu: false,
        subMenuItems: [
            {
                id: 1,
                title: "Hồ sơ giáo viên",
                path: "/teacher-profile",
                subMenu: false,
            },
            {
                id: 2,
                title: "Chấm công-Lịch làm việc",
                path: "/Timekeeping",
                subMenu: false,
            },
        ],
    },
    {
        id: 4,
        title: "Quản lý học phí và tài chính",
        path: "",
        subMenuItems: [
            {
                id: 1,
                title: "Hóa đơn thanh toán học phí",
                path: "/bill",
                subMenu: false,
            },
            {
                id: 2,
                title: "Báo cáo hàng tháng",
                path: "/report",
                subMenu: false,
            },
            // {
            //   id: 3,
            //   title: "Loại SP & DV",
            //   path: "/product-type",
            //   subMenu: false,
            // },
        ],
    },
    {
        id: 5,
        title: "Quản lý thực đơn và dinh dưỡng",
        path: "",
        subMenu: false,
        subMenuItems: [
            {
                id: 1,
                title: "Thực đơn hàng ngày",
                path: "/daily-menu",
                subMenu: false,
            },
            {
                id: 2,
                title: "Nhà cung cấp thực phẩm",
                path: "food-supplier",
                subMenu: false,
            },
            // {
            //   id: 3,
            //   title: "Loại SP & DV",
            //   path: "/product-type",
            //   subMenu: false,
            // },
        ],
    },
    {
        id: 6,
        title: "Giao tiếp giữa nhà trường và phụ huynh",
        path: "",
        subMenuItems: [
            {
                id: 1,
                title: "Nhận xét của giáo viên",
                path: "/teacher-reviews",
                subMenu: false,
            },
            {
                id: 2,
                title: "Công bố thông tin",
                path: "/information-disclosure",
                subMenu: false,
            },
        ],
    },
    {
        id: 7,
        title: "Quản lý cơ sở vật chất",
        path: "",
        subMenuItems: [
            {
                id: 1,
                title: "Dụng cụ học tập",
                path: "/news",
                subMenu: false,
            },
            {
                id: 2,
                title: "Bảo trì sửa chữa",
                path: "/investment-guide",
                subMenu: false,
            },
            {
                id: 3,
                title: "Nhận định thị trường",
                path: "/broker-consensus",
                subMenu: false,
            },
        ],
    },

    // {
    //   id: 8,
    //   title: "Quản lý tài sản quỹ",
    //   path: "",
    //   subMenu: true,
    //   subMenuItems: [
    //     {
    //       id: 1,
    //       title: "Hiệu suất đầu tư",
    //       path: "/chart-nav-monthly",
    //       subMenu: false,
    //     },
    //     {
    //       id: 2,
    //       title: "Phân bố tài sản theo Loại tài sản",
    //       path: "/chart-nav-by-type",
    //       subMenu: false,
    //     },
    //     {
    //       id: 3,
    //       title: "Phân bố tài sản theo ngành",
    //       path: "/chart_nav_by_industry",
    //       subMenu: false,
    //     },
    //     {
    //       id: 4,
    //       title: "Biểu đồ đầu tư",
    //       path: "/chart_big_investment",
    //       subMenu: false,
    //     },
    //   ],
    // },
    // {
    //   id: 9,
    //   title: "Chính sách công ty",
    //   path: "/company-policies",
    //   subMenu: false,
    // },
    // {
    //   id: 10,
    //   title: "Khách hàng cần tư vấn",
    //   path: "/contacts",
    //   subMenu: false,
    // },
    // {
    //   id: 11,
    //   title: "Quản lý đồng bộ dữ liệu",
    //   path: "/sync-data",
    //   subMenu: false,
    // },
    {
        id: 8,
        title: "Đăng xuất",
        path: "/login",
        // action: async () => {
        //   await authApiRequest.logout();
        // },
        subMenu: false,
        // icon: (
        //   <Image
        //     src='/assets/icons/icon_logout.svg'
        //     alt='icon-logout'
        //     width={30}
        //     height={30}
        //   />
        // ),
    },
];
const Layout = ({ children }: any) => {
    const pathName = usePathname();
    const { user, updateUser } = useAccountStore();
    const { title } = useHeaderStore();
    const isTablet = useMediaQuery("(max-width:1280px)");
    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded: IInfoUser = jwtDecode(token);
                updateUser(decoded);
            }
        }
    }, [user, updateUser]);
    return (
        <Box>
            <Box className='border-b border-grayColor h-[70px] flex items-center px-50 fixed left-0 top-0 right-0 z-50 bg-white'>
                <Box className='h-[70px] w-[15%] flex items-center justify-center'>
                    <Link href={"/"}>
                        <Image
                            src='/assets/images/logo-school.png'
                            alt='icon-report'
                            width={190}
                            height={50}
                            quality={100}
                            placeholder='blur'
                            blurDataURL={"/assets/images/logo-school.png"}
                            className='cursor-pointer'
                        />
                    </Link>
                </Box>
                <Typography className='!px-6 !font-medium !text-2xl '>
                    {title}
                </Typography>
                {/* <Box className='fixed top-0 right-[50px] '>
                    <HeaderSidebar
                        username={user?.roles[0] ?? ""}
                        fullName={user?.username ?? ""}
                    />
                </Box> */}
            </Box>
            <Stack direction={"row"}>
                {/* <Box className={`w-[15%] fixed left-0 top-[70px] right-0 z-50 h-full `}>
                    <Sidebar spacing={"32px"} menu={Menus} pathName={pathName} />
                </Box> */}
                <Box className='w-[85%] min-h-screen ml-[15%] mt-[70px] bg-grayBgLayout'>
                    {children}
                </Box>
            </Stack>
        </Box>
    );
};

export default Layout;
