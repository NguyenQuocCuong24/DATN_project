"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            router.push("/site-page");
        } else {
            setMessage(data.message);
            // Xóa trường mật khẩu để người dùng có thể nhập lại ngay
            setPassword("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-4">KidsCare Mầm Non</h2>
                    <p className="mb-4 text-lg">Chào mừng đến với Hệ thống Quản lý Trường Mầm Non!</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Quản lý học sinh và lớp học</li>
                        <li>Theo dõi học phí</li>
                        <li>Phân công giáo viên</li>
                        <li>Tạo báo cáo hàng tháng</li>
                        <li>Xem lịch giảng dạy</li>
                    </ul>
                </div>
                <div className="w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            autoComplete="email"
                            required
                        />
                        <div className="relative mb-3">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showPassword ? "Hiện" : "Ẩn"}
                            </button>
                        </div>
                        <p className="mt-2 text-center text-red-500 mb-5">Bạn chưa có tài khoản? Đăng kí ngay!</p>
                        <div className="flex justify-between items-center space-x-4">
                            <button type="submit" className="w-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                                Đăng nhập
                            </button>
                            <Link href="/login/register" className="w-1/2 bg-green-600 text-white p-3 rounded-lg text-center hover:bg-green-700 transition">
                                Đăng ký
                            </Link>
                        </div>
                    </form>
                    {message && <p className="mt-4 text-red-500 font-semibold">{message}</p>}
                </div>
            </div>
        </div>
    );
}
