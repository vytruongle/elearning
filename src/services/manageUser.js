import http from "../constant/api";

const manageUser = {
  getRegister: (payload) => {
    return http.post("QuanLyNguoiDung/DangKy", payload);
  },
  getLogin: (payload) => http.post(`/QuanLyNguoiDung/DangNhap`, payload),
  getUpdate: (payload) =>
    http.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, payload),
  getInfomation: (payload) =>
    http.post(`QuanLyNguoiDung/ThongTinTaiKhoan`, payload),
};

export default manageUser;
