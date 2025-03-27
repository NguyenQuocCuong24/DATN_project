"use client";

import HeaderSidebar from "@/common/HeaderSidebar";
import Sidebar from "@/common/Sidebar";
import { useAccountStore } from "@/stores/accountStores";
import { useHeaderStore } from "@/stores/headerStores";
import { baseMenu } from "@/types/sidebar.type";
import { IInfoUser } from "@/types/user-infor.type";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Menus: baseMenu[] = [
    { id: 1, title: "Quản lý các trang chính", path: "/site-page", subMenu: false },
    { id: 2, title: "Quản lí học sinh", path: "/branch-student", subMenu: false },
    { id: 3, title: "Quản lý giáo viên", path: "", subMenu: false },
    {
        id: 4, title: "Quản lý học phí và tài chính", path: "", subMenuItems: [
            { id: 1, title: "Hóa đơn thanh toán học phí", path: "/bill", subMenu: false },
            { id: 2, title: "Báo cáo hàng tháng", path: "/report", subMenu: false },
        ]
    },
    {
        id: 5, title: "Quản lý thực đơn và dinh dưỡng", path: "", subMenuItems: [
            { id: 1, title: "Thực đơn hàng ngày", path: "/daily-menu", subMenu: false },
            { id: 2, title: "Nhà cung cấp thực phẩm", path: "/food-supplier", subMenu: false },
        ]
    },
    {
        id: 6, title: "Giao tiếp giữa nhà trường và phụ huynh", path: "", subMenuItems: [
            { id: 1, title: "Nhận xét của giáo viên", path: "/teacher-reviews", subMenu: false },
            { id: 2, title: "Công bố thông tin", path: "/information-disclosure", subMenu: false },
        ]
    },
    { id: 7, title: "Đăng xuất", path: "/login", subMenu: false },
];

const Layout = ({ children }: any) => {
    const pathName = usePathname();
    const { user, updateUser } = useAccountStore();
    const { title } = useHeaderStore();

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
        <Box className="flex flex-col h-screen">
            {/* Header */}
            <Box className="border-b border-gray-200 h-16 flex items-center px-12 fixed w-full top-0 bg-white z-50 shadow-md">
                <Box className="w-1/6 flex items-center">
                    <Link href="/">
                        <Image src="/assets/images/logo-school.png" alt="logo" width={190} height={50} className="cursor-pointer" />
                    </Link>
                </Box>
                <Typography className="text-2xl font-semibold px-6">{title}</Typography>
            </Box>

            <Stack direction="row" className="flex-grow pt-16">
                {/* Sidebar */}
                <Box className="w-1/6 fixed left-0 top-16 h-full bg-gray-100 shadow-lg">
                    <Sidebar spacing="32px" menu={Menus} pathName={pathName} />
                </Box>

                {/* Content */}
                <Box className="w-5/6 ml-auto min-h-screen p-6 bg-gray-50 overflow-auto">
                    {children}
                </Box>
            </Stack>
        </Box>
    );
};

export default Layout;