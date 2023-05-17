import http from "../constant/api";

export const manageAdmin = {
  //quản ký người dùng
  getUserList: (payload) =>
    http.get(`QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang${payload}`),
  addUser: (payload) => http.post("QuanLyNguoiDung/ThemNguoiDung", payload),
  getUpdate: (payload) =>
    http.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, payload),
  deleteUser: (payload) =>
    http.delete(`QuanLyNguoiDung/XoaNguoiDung${payload}`),
  searchUser: (payload) =>
    http.get(`QuanLyNguoiDung/TimKiemNguoiDung${payload}`),
  // quản lý khóa học
  getCoursesList: (payload) =>
    http.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang${payload}`),
  addCourse: (payload) => http.post("QuanLyKhoaHoc/ThemKhoaHoc", payload),
  getUpdateCourse: (payload) =>
    http.put(`QuanLyKhoaHoc/CapNhatKhoaHoc`, payload),
  deleteCourse: (payload) => http.delete(`QuanLyKhoaHoc/XoaKhoaHoc${payload}`),
  updateImage: (payload) =>
    http.post(`QuanLyKhoaHoc/CapNhatKhoaHocUpload`, payload),
  addNewImage: (payload) =>
    http.post(`QuanLyKhoaHoc/ThemKhoaHocUploadHinh`, payload),
  searchCourses: (payload) =>
    http.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc${payload}`),
  // Quàn lý ghi danh

  // Ghi danh người dùng dwuaj vào khóa học
  getUnregisterUser: (payload) =>
    http.post("QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", payload),
  getRegisteredUser: (payload) =>
    http.post(`QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, payload),
  getUserWaitRegister: (payload) =>
    http.post(`QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, payload),
  verificationUser: (payload) =>
    http.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", payload),
  deleteRegister: (payload) => http.post("QuanLyKhoaHoc/HuyGhiDanh", payload),
  // Ghi danh khóa học dựa vào người dùng
  getUnregisterCourses: (payload) =>
    http.post("QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", payload),
  getRegisteredCourses: (payload) =>
    http.post("QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", payload),
  getCourseWaitRegister: (payload) =>
    http.post("QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", payload),
  verificationCourse: (payload) =>
    http.post("QuanLyKhoaHoc/GhiDanhKhoaHoc", payload),
  deleteUserCourse: (payload) => http.post("QuanLyKhoaHoc/HuyGhiDanh", payload),
};
