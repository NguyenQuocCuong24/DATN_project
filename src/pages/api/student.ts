import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";

//  Get student (có search)
const getStudents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const search = req.query.search ? `%${req.query.search}%` : "%";
    const [rows]: any = await pool.query(
      "SELECT id, name, age, date, parents, contact, class FROM student WHERE name LIKE ?",
      [search]
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách học sinh:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Add student
const addStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, age, parents, date, contact, class: studentClass } = req.body;

    if (!name || !age || !parents || !date || !contact || !studentClass) {
      return res.status(400).json({ message: "Thiếu thông tin học sinh" });
    }

    const [result]: any = await pool.query(
      "INSERT INTO student (name, age, parents, date, contact, class) VALUES (?, ?, ?, ?, ?, ?)",
      [name, age, parents, date, contact, studentClass]
    );

    res.status(201).json({ message: "Thêm học sinh thành công", id: result.insertId });
  } catch (error) {
    console.error("Lỗi khi thêm học sinh:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}


// uppdate student
const updateStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const { name, age, parents, date, contact } = req.body;
    const classValue = req.body["class"]; // Đọc giá trị 'class' an toàn

    if (!name || !age || !parents || !date || !contact || !classValue) {
      return res.status(400).json({ message: "Thiếu thông tin cập nhật" });
    }

    const [result]: any = await pool.query(
      "UPDATE student SET name = ?, age =?, parents = ?, date = ?, contact = ?, class = ? WHERE id = ?",
      [name, age, parents, date, contact, classValue, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật học sinh:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Delete Student
const deleteStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const [result]: any = await pool.query("DELETE FROM student WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }

    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa học sinh:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Xử lý API dựa trên phương thức
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getStudents(req, res);
  if (req.method === "POST") return addStudent(req, res);
  if (req.method === "PUT") return updateStudent(req, res);
  if (req.method === "DELETE") return deleteStudent(req, res);
  return res.status(405).json({ message: "Method Not Allowed" });
}
