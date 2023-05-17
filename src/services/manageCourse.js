import http from "../constant/api";

export const manageCourses = {
  //get courses list
  getCourseList: (query) =>
    http.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc${query}`),
  // get detail course
  getDetailCourse: (query) =>
    http.get(`QuanLyKhoaHoc/LayThongTinKhoaHoc${query}`),
  //get courses category
  getCourseCategory: () => http.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc"),
  //get courses category list
  getCourseCategoryList: (query) =>
    http.get(`QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc${query}`),
  addCourse: (payload) => http.post(`QuanLyKhoaHoc/DangKyKhoaHoc`, payload),
  removeCourse: (payload) => http.post(`QuanLyKhoaHoc/HuyGhiDanh`, payload),
};
