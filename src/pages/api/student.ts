import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";
import { log } from "console";
import { convertStringToDate } from "@/utils/convertDate";
import { covertGender } from "../helper/helper";


//  Get student (có search)
const getStudents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const search = req.query.search ? `%${req.query.search}%` : "%";
    const [rows]: any = await pool.query(
      `SELECT StudentID, FullName, DateOfBirth, Gender, ClassID, Address, Status, 
      ParentName, ParentPhone
      FROM students WHERE Deleted_at IS NULL and FullName LIKE ?`,
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
    const { FullName, DateOfBirth, Gender, ClassID, Address, ParentPhone, ParentName } = req.body;
    let date = convertStringToDate(DateOfBirth);
    let gender = covertGender(Gender);
    
    if (!FullName) {
      return res.status(400).json({ message: "Thiếu thông tin học sinh" });
    }

    const [result]: any = await pool.query(
      "INSERT INTO students (FullName, DateOfBirth, Gender, ClassID, Address, ParentPhone, ParentName, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [FullName, date, gender, ClassID, Address, ParentPhone, ParentName, 1]
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
    const { FullName, DateOfBirth, Gender, ClassID, Address, ParentPhone, ParentName } = req.body;
    let date = convertStringToDate(DateOfBirth);
    let gender = covertGender(Gender);

    if (!FullName) {
      return res.status(400).json({ message: "Thiếu thông tin học sinh" });
    }

    const [result]: any = await pool.query(
      "UPDATE students SET FullName = ?, DateOfBirth =?, Gender = ?, ClassID = ?, Address = ?, ParentPhone = ?, ParentName = ? WHERE StudentID = ?",
      [FullName, date, gender, ClassID, Address, ParentPhone, ParentName, id]
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
  const now = new Date();
  try {
    const [result]: any = await pool.query("UPDATE students Set Deleted_at = ? WHERE StudentID = ?", [now, id]);

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
