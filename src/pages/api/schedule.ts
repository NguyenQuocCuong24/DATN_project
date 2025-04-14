import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";
import { convertStringToDate } from "@/utils/convertDate";
import { verifyToken } from "../helper/auth";

const getSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
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
      `SELECT ScheduleID, ClassID, DayOfWeek, Subject, StartTime, EndTime
      FROM schedule WHERE Deleted_at IS NULL and Subject LIKE ? 
      LIMIT ? OFFSET ?`,
      [search, limit, offset]
    );  
      
    const [[{ total }]]: any = await pool.query(
      `SELECT COUNT(*) as total 
       FROM schedule 
       WHERE Deleted_at IS NULL AND Subject LIKE ?`,
      [search]
    );

    return res.status(200).json({ rows, total });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thời khóa biểu:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const addSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = verifyToken(req, ['1']);
    
    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }
    const { ClassID, DayOfWeek, Subject, StartTime, EndTime } = req.body;
    let date = convertStringToDate(DayOfWeek);
    
    if (!ClassID || !Subject || !StartTime || !EndTime) {
      return res.status(400).json({ message: "Thiếu thông tin thời khóa biểu" });
    }

    const [result]: any = await pool.query(
      "INSERT INTO schedule (ClassID, DayOfWeek, Subject, StartTime, EndTime) VALUES (?, ?, ?, ?, ?)",
      [ClassID, date, Subject, StartTime, EndTime]
    );

    res.status(201).json({ message: "Thêm thời khóa biểu thành công", id: result.insertId });
  } catch (error) {
    console.error("Lỗi khi thêm thời khóa biểu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}


const updateSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const auth = verifyToken(req, ['1']);
    
    if (!auth.valid) {
      return res.status(auth.statusCode).json({ message: auth.message });
    }
    const { ClassID, DayOfWeek, Subject, StartTime, EndTime } = req.body;
    let date = convertStringToDate(DayOfWeek);

    if (!ClassID || !Subject || !StartTime || !EndTime) {
      return res.status(400).json({ message: "Thiếu thông tin thời khóa biểu" });
    }

    const [result]: any = await pool.query(
      `UPDATE schedule SET ClassID = ?, DayOfWeek =?, Subject = ?, StartTime = ?, 
      EndTime = ? WHERE ScheduleID = ?`,
      [ClassID, date, Subject, StartTime, EndTime, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy thời khóa biểu" });
    }

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật thời khóa biểu:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteSchedule = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const now = new Date();
  const auth = verifyToken(req, ['1']);
    
  if (!auth.valid) {
    return res.status(auth.statusCode).json({ message: auth.message });
  }
  try {
    const [result]: any = await pool.query("UPDATE schedule Set Deleted_at = ? WHERE ScheduleID = ?", [now, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy thời khóa biểu" });
    }

    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa thời khóa biểu:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// Xử lý API dựa trên phương thức
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getSchedule(req, res);
  if (req.method === "POST") return addSchedule(req, res);
  if (req.method === "PUT") return updateSchedule(req, res);
  if (req.method === "DELETE") return deleteSchedule(req, res);
  return res.status(405).json({ message: "Method Not Allowed" });
}
