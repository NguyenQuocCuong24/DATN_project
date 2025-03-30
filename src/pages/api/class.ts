import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";

const getClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const search = req.query.search ? `%${req.query.search}%` : "%";
    const [rows]: any = await pool.query(
      `SELECT ClassID, ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd
      FROM classes WHERE Deleted_at IS NULL and ClassName LIKE ?`,
      [search]
    );    
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách lớp:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const addClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd } = req.body;
    
    if (!ClassName) {
      return res.status(400).json({ message: "Thiếu thông tin lớp" });
    }

    const [result]: any = await pool.query(
      "INSERT INTO classes (ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd) VALUES (?, ?, ?, ?, ?)",
      [ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd, 1]
    );

    res.status(201).json({ message: "Thêm lớp thành công", id: result.insertId });
  } catch (error) {
    console.error("Lỗi khi thêm lớp:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}


const updateClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const { ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd } = req.body;

    if (!ClassName) {
      return res.status(400).json({ message: "Thiếu thông tin lớp" });
    }

    const [result]: any = await pool.query(
      "UPDATE classes SET ClassName = ?, TeacherID =?, MaxStudents = ?, SchoolYearStart = ?, SchoolYearEnd = ? WHERE ClassID = ?",
      [ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp" });
    }

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật lớp:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const now = new Date();
  try {
    const [result]: any = await pool.query("UPDATE classes Set Deleted_at = ? WHERE ClassID = ?", [now, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy lớp" });
    }

    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa lớp:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Xử lý API dựa trên phương thức
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getClasses(req, res);
  if (req.method === "POST") return addClasses(req, res);
  if (req.method === "PUT") return updateClasses(req, res);
  if (req.method === "DELETE") return deleteClasses(req, res);
  return res.status(405).json({ message: "Method Not Allowed" });
}
