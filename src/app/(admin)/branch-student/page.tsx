"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useColumnStudent from "./components/useColumnStudent";
import { StyledButtonPrimary } from "@/styles/style-common";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";

const StudentPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({ name: "", age: "", parents: "", date: "", contact: "", class: "" });
  const columns = useColumnStudent({ deletePageSeo: async () => { } });

  interface Student {
    id?: number;
    name: string;
    age: string;
    parents: string;
    date: string;
    contact: string;
    class: string;
    [key: string]: string | number | undefined; 
  }

  useEffect(() => {
    fetchStudent();
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);


  const fetchStudent = async () => {
    try {
      const res = await fetch("/api/student");
      const data = await res.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách học sinh:", error);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa học sinh này?")) return;

    try {
      const res = await fetch(`/api/student?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Lỗi khi xóa học sinh");

      fetchStudent();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setOpenEditDialog(true);
  };


  const handleUpdate = async () => {
    if (!selectedStudent || !selectedStudent.id) return;

    try {
      const res = await fetch(`/api/student?id=${selectedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedStudent),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật học sinh");

      fetchStudent();
      setOpenEditDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddStudent = async () => {
    console.log(" Dữ liệu học sinh gửi đi:", newStudent);

    if (!newStudent.name.trim()) {
      alert("Tên học sinh không được để trống");
      return;
    }

    try {
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const responseData = await res.json();
      console.log(" Phản hồi từ API:", responseData);

      if (!res.ok) {
        throw new Error(responseData.message || "Lỗi khi thêm học sinh");
      }

      fetchStudent(); // Load lại danh sách học sinh
      setOpenAddDialog(false);
      setNewStudent({ name: "", age: "", parents: "", date: "", contact: "", class: "" });
    } catch (error) {
      console.error("🔥 Lỗi khi thêm học sinh:", error);
    }
  };



  return (
    <Box className="bg-white m-5 p-8 rounded-2xl">
      <Box className="flex justify-between items-center mb-5 mt-5">
        <StyledButtonPrimary startIcon={<AddIcon />} className="w-40 h-[50px]" onClick={() => setOpenAddDialog(true)}>
          Thêm học sinh
        </StyledButtonPrimary>

        <Box className="flex items-center gap-2">
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm..."
            size="small"
            className="w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <StyledButtonPrimary className="h-[40px] w-[100px]">Tìm kiếm</StyledButtonPrimary>
        </Box>
      </Box>

      {/* Modal thêm học sinh */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Thêm Học Sinh</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên học sinh"
            fullWidth
            margin="dense"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <TextField
            label="Tuổi"
            fullWidth
            margin="dense"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
          />
          <TextField
            label="Phụ huynh"
            fullWidth
            margin="dense"
            value={newStudent.parents}
            onChange={(e) => setNewStudent({ ...newStudent, parents: e.target.value })}
          />
          <TextField
            label="Ngày sinh"
            fullWidth
            margin="dense"
            value={newStudent.date}
            onChange={(e) => setNewStudent({ ...newStudent, date: e.target.value })}
          />
          <TextField
            label="Liên hệ"
            fullWidth
            margin="dense"
            value={newStudent.contact}
            onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
          />
          <TextField
            label="Lớp"
            fullWidth
            margin="dense"
            value={newStudent.class}
            onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleAddStudent}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* DataGrid - Danh sách học sinh */}
      <DataGrid
        rows={filteredStudents}
        columns={[
          ...columns,
          {
            field: "edit",
            headerName: "Sửa",
            headerAlign: "center",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <div className="flex justify-center items-center w-full h-full">
                <Image src="/assets/icons/icon_edit.svg" alt="Edit" width={23} height={23} className="cursor-pointer" onClick={() => handleEdit(params.row)} />
              </div>
            ),
          },
          {
            field: "delete",
            headerName: "Xóa",
            headerAlign: "center",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <div className="flex justify-center items-center w-full h-full">
                <Image src="/assets/icons/recycle-bin.svg" alt="Delete" width={23} height={23} className="cursor-pointer" onClick={() => handleDelete(params.row.id)} />
              </div>
            ),
          },
        ]}
        getRowId={(row) => row.id}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />

      {/* Modal sửa học sinh */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Sửa Học Sinh</DialogTitle>
        <DialogContent>
          {["name", "age", "parents", "date", "contact", "class"].map((field) => (
            <TextField
              key={field}
              label={field}
              fullWidth
              margin="dense"
              value={selectedStudent?.[field as keyof Student] || ""}
              onChange={(e) => setSelectedStudent((prev) => ({
                ...(prev as Student),
                [field]: e.target.value
              }))}
            />
          ))}

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentPage;
