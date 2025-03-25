import pool from "../../../configs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM login WHERE email = ?", [email]);

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const user = rows[0];

    // Kiểm tra mật khẩu
    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", { expiresIn: "1h" });

    return res.status(200).json({ message: "Đăng nhập thành công", token });
  } catch (error) {
    console.error(" Lỗi server:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
}
