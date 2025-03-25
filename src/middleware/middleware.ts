// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("token")?.value;

//     // Nếu không có token, chuyển hướng về trang đăng nhập
//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     return NextResponse.next();
// }

// // Áp dụng middleware cho các trang cần bảo vệ
// export const config = {
//     matcher: ["/site-page/:path*"], // Áp dụng middleware cho cả các sub-routes
// };

