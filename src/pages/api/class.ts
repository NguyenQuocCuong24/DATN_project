import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";
import { verifyToken } from "../helper/auth";

const getClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = verifyToken(req, ['1']);
        
    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search ? `%${req.query.search}%` : "%";
    const [rows]: any = await pool.query(
      `SELECT ClassID, ClassName, TeacherID, MaxStudents, SchoolYearStart, SchoolYearEnd
      FROM classes WHERE Deleted_at IS NULL and ClassName LIKE ?
      LIMIT ? OFFSET ?`,
      [search, limit, offset]
    );  
      
    const [[{ total }]]: any = await pool.query(
      `SELECT COUNT(*) as total 
       FROM classes 
       WHERE Deleted_at IS NULL AND FullName LIKE ?`,
      [search]
    );

    return res.status(200).json({ rows, total });

  } catch (error) {
    console.error("Lỗi khi lấy danh sách lớp:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const addClasses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = verifyToken(req, ['1']);
        
    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }
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
  const auth = verifyToken(req, ['1']);
          
  if (!auth.valid) {
    return res.status(auth.statusCode).json({ message: auth.message });
  }
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
  const auth = verifyToken(req, ['1']);
          
  if (!auth.valid) {
    return res.status(auth.statusCode).json({ message: auth.message });
  }
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
