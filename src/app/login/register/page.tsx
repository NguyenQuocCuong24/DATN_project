"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Giáo viên");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Mật khẩu xác nhận không khớp!");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, fullName, email, password, role }),
        });

        const data = await res.json();
        if (res.ok) {
            router.push("/login");
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="w-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white ">
                    <h2 className="text-3xl font-bold mb-4">KidsCare Mầm Non</h2>
                    <p className="mb-4 text-lg">Chào mừng đến với Hệ thống Quản lý Mẫu giáo!</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Quản lý học sinh và lớp học</li>
                        <li>Theo dõi học phí</li>
                        <li>Phân công giáo viên</li>
                        <li>Tạo báo cáo hàng tháng</li>
                        <li>Xem lịch giảng dạy</li>
                    </ul>
                </div>
                <div className="w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-6">Xin chào</h1>
                    <p className="mb-4">Đăng ký tài khoản mới</p>
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email đăng nhập"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                        >
                            <option value="Giáo viên">Giáo viên</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                            Tạo tài khoản
                        </button>
                    </form>
                    {message && <p className="mt-4 text-red-500 font-semibold">{message}</p>}
                    <p className="mt-4 text-center text-red-500">Cần chuyển đổi tài khoản?</p>
                    <Link href="/login" className="block text-center bg-gray-200 p-3 rounded-lg mt-2 hover:bg-gray-300 transition">
                        Đăng nhập vào tài khoản hiện có
                    </Link>
                </div>
            </div>
        </div>
    );
}
