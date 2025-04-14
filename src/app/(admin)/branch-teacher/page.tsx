"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useColumnTeacher from "./components/useColumnTeacher";
import { StyledButtonPrimary } from "@/styles/style-common";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";

const TeacherPage = () => {
  const [Teacher, setTeacher] = useState<Teacher[]>([]);
  const [filteredTeacher, setFilteredTeacher] = useState<Teacher[]>([]);
  const [selectedTeacher, setselectedTeacher] = useState<Teacher | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTeacher, setNewTeacher] = useState({ name: "", age: "", email: "", adress: "", contact: "", class: "", specialization: "" });
  const columns = useColumnTeacher({ deletePageSeo: async () => { } });

  interface Teacher {
    id?: number;
    name: string;
    age: string;
    email: string;
    adress: string;
    contact: string;
    class: string;
    specialization: string;
    [key: string]: string | number | undefined;
  }

  useEffect(() => {
    fetchTeacher();
  }, []);

  useEffect(() => {
    const filtered = Teacher.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeacher(filtered);
  }, [searchTerm, Teacher]);


  const fetchTeacher = async () => {
    try {
      const res = await fetch("/api/teacher");
      const data = await res.json();
      setTeacher(data);
      setFilteredTeacher(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách giáo viên:", error);
    }
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa giáo viên này?")) return;

    try {
      const res = await fetch(`/api/teacher?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Lỗi khi xóa giáo viên");

      fetchTeacher();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setselectedTeacher(teacher);
    setOpenEditDialog(true);
  };


  const handleUpdate = async () => {
    if (!selectedTeacher || !selectedTeacher.id) return;

    try {
      const res = await fetch(`/api/teacher?id=${selectedTeacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTeacher),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật giáo viên");

      fetchTeacher();
      setOpenEditDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTeacher = async () => {
    console.log(" Dữ liệu giáo viên gửi đi:", newTeacher);

    if (!newTeacher.name.trim()) {
      alert("Tên giáo viên không được để trống");
      return;
    }

    try {
      const res = await fetch("/api/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeacher),
      });

      const responseData = await res.json();
      console.log(" Phản hồi từ API:", responseData);

      if (!res.ok) {
        throw new Error(responseData.message || "Lỗi khi thêm giáo viên");
      }

      fetchTeacher(); // Load lại danh sách giáo viên
      setOpenAddDialog(false);
      setNewTeacher({ name: "", age: "", email: "", adress: "", contact: "", class: "", specialization: "" });
    } catch (error) {
      console.error("🔥 Lỗi khi thêm giáo viên:", error);
    }
  };



  return (
    <Box className="bg-white m-5 p-8 rounded-2xl">
      <Box className="flex justify-between items-center mb-5 mt-5">
        <StyledButtonPrimary startIcon={<AddIcon />} className="w-40 h-[50px]" onClick={() => setOpenAddDialog(true)}>
          Thêm giáo viên
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

      {/* Modal thêm giáo viên */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Thêm giáo viên</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên giáo viên"
            fullWidth
            margin="dense"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          />
          <TextField
            label="Tuổi"
            fullWidth
            margin="dense"
            value={newTeacher.age}
            onChange={(e) => setNewTeacher({ ...newTeacher, age: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
          />
          <TextField
            label="Địa chỉ"
            fullWidth
            margin="dense"
            value={newTeacher.adress}
            onChange={(e) => setNewTeacher({ ...newTeacher, adress: e.target.value })}
          />
          <TextField
            label="Liên hệ"
            fullWidth
            margin="dense"
            value={newTeacher.contact}
            onChange={(e) => setNewTeacher({ ...newTeacher, contact: e.target.value })}
          />
          <TextField
            label="Lớp"
            fullWidth
            margin="dense"
            value={newTeacher.class}
            onChange={(e) => setNewTeacher({ ...newTeacher, class: e.target.value })}
          />
          <TextField
            label="Môn học"
            fullWidth
            margin="dense"
            value={newTeacher.specialization}
            onChange={(e) => setNewTeacher({ ...newTeacher, specialization: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleAddTeacher}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>

      {/* DataGrid - Danh sách giáo viên */}
      <DataGrid
        rows={filteredTeacher}
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
        getRowId={(row) => row.TeacherID}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />

      {/* Modal sửa giáo viên */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Sửa giáo viên</DialogTitle>
        <DialogContent>
          {["name", "age", "email", "adress", "contact", "class", "specialization"].map((field) => (
            <TextField
              key={field}
              label={field}
              fullWidth
              margin="dense"
              value={selectedTeacher?.[field as keyof Teacher] || ""}
              onChange={(e) => setselectedTeacher((prev) => ({
                ...(prev as Teacher),
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

export default TeacherPage;
