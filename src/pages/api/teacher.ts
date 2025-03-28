import { NextApiRequest, NextApiResponse } from "next";
import pool from "@/configs/db";

//  Get Teacher (có search)
const getTeacher = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const search = req.query.search ? `%${req.query.search}%` : "%";
        const [rows]: any = await pool.query(
            "SELECT id, name, age, email, contact, adress, class, specialization FROM teacher WHERE name LIKE ?",
            [search]
        );
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách giáo viên:", error);

        return res.status(500).json({ message: "Lỗi server" });
    }
};

// Add Teacher
const addTeacher = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, age, email, adress, contact, specialization, class: teacherClass } = req.body;

        if (!name || !age || !email || !adress || !contact || !specialization || !teacherClass) {
            return res.status(400).json({ message: "Thiếu thông tin giáo viên" });
        }

        const [result]: any = await pool.query(
            "INSERT INTO teacher (name, age, email, adress, contact, class, specialization) VALUES (?, ?, ?, ?, ?, ?,?)",
            [name, age, email, adress, contact, teacherClass, specialization]
        );

        res.status(201).json({ message: "Thêm giáo viên thành công", id: result.insertId });
    } catch (error) {
        console.error("Lỗi khi thêm giáo viên:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}


// uppdate Teacher
const upadressTeacher = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        const { name, age, email, adress, contact, specialization } = req.body;
        const classValue = req.body["class"]; // Đọc giá trị 'class' an toàn

        if (!name || !age || !email || !adress || !contact || !classValue) {
            return res.status(400).json({ message: "Thiếu thông tin cập nhật" });
        }

        const [result]: any = await pool.query(
            "UPDATE teacher SET name = ?, age =?, email = ?, adress = ?, contact = ?, class = ?, specialization = ? WHERE id = ?",
            [name, age, email, adress, contact, classValue, specialization, id]
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

// Delete Teacher
const deleteTeacher = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
        const [result]: any = await pool.query("DELETE FROM teacher WHERE id = ?", [id]);

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
    if (req.method === "GET") return getTeacher(req, res);
    if (req.method === "POST") return addTeacher(req, res);
    if (req.method === "PUT") return upadressTeacher(req, res);
    if (req.method === "DELETE") return deleteTeacher(req, res);
    return res.status(405).json({ message: "Method Not Allowed" });
}
