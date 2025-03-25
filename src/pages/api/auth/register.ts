import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// Cấu hình kết nối MySQL (nên dùng biến môi trường cho bảo mật)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "cuong1234",
  database: process.env.DB_DATABASE || "datn",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  
  const { username, fullName, email, password, role } = req.body;
  
  // Kiểm tra dữ liệu bắt buộc
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  }
  
  try {
    // Kiểm tra email đã tồn tại chưa
    const [existing]: any = await pool.query("SELECT * FROM login WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email đã được đăng ký" });
    }
    
    // Mã hóa mật khẩu
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Chèn dữ liệu vào bảng users
    await pool.query(
      "INSERT INTO login (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, password, role]
    );
    
    return res.status(200).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau" });
  }
}
