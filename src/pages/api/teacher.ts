import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";
import { log } from "console";
import { convertStringToDate } from "@/utils/convertDate";
import { covertGender } from "../helper/helper";
import { verifyToken } from "../helper/auth";


const getTeachers = async (req: NextApiRequest, res: NextApiResponse) => {
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
      `SELECT TeacherID, FullName, DateOfBirth, Gender, PhoneNumber, Address, Email, 
      Qualification, Status
      FROM teachers WHERE Deleted_at IS NULL and FullName LIKE ?
      LIMIT ? OFFSET ?`,
      [search, limit, offset]
    );  
      
    const [[{ total }]]: any = await pool.query(
      `SELECT COUNT(*) as total 
       FROM teachers 
       WHERE Deleted_at IS NULL AND FullName LIKE ?`,
      [search]
    );

    return res.status(200).json({ rows, total });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách giáo viên:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const addTeachers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = verifyToken(req, ['1']);

    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }
    const { FullName, DateOfBirth, Gender, PhoneNumber, Address, Email, Qualification } = req.body;
    let date = convertStringToDate(DateOfBirth);
    let gender = covertGender(Gender);
    
    if (!FullName) {
      return res.status(400).json({ message: "Thiếu thông tin giáo viên" });
    }

    const [result]: any = await pool.query(
      "INSERT INTO teachers (FullName, DateOfBirth, Gender, PhoneNumber, Address, Email, Qualification, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [FullName, date, gender, PhoneNumber, Address, Email, Qualification, 1]
    );

    res.status(201).json({ message: "Thêm giáo viên thành công", id: result.insertId });
  } catch (error) {
    console.error("Lỗi khi thêm giáo viên:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}


const updateTeachers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const auth = verifyToken(req, ['1']);

    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }
    const { FullName, DateOfBirth, Gender, PhoneNumber, Address, Email, Qualification } = req.body;
    let date = convertStringToDate(DateOfBirth);
    let gender = covertGender(Gender);

    if (!FullName) {
      return res.status(400).json({ message: "Thiếu thông tin giáo viên" });
    }

    const [result]: any = await pool.query(
      "UPDATE teachers SET FullName = ?, DateOfBirth =?, Gender = ?, PhoneNumber = ?, Address = ?, Email = ?, Qualification = ? WHERE TeacherID = ?",
      [FullName, date, gender, PhoneNumber, Address, Email, Qualification, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });
    }

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật giáo viên:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteTeachers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const now = new Date();
  try {
    const auth = verifyToken(req, ['1']);
    
    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }
    const [result]: any = await pool.query("UPDATE teachers Set Deleted_at = ? WHERE TeacherID = ?", [now, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy giáo viên" });
    }

    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa giáo viên:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Xử lý API dựa trên phương thức
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getTeachers(req, res);
  if (req.method === "POST") return addTeachers(req, res);
  if (req.method === "PUT") return updateTeachers(req, res);
  if (req.method === "DELETE") return deleteTeachers(req, res);
  return res.status(405).json({ message: "Method Not Allowed" });
}
