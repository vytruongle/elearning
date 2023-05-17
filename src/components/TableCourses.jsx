import { Modal } from "antd";
import { Input } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { searchCourses, updateImage } from "../store/manageAdmin/thunkAction";
import { message } from "../module/MessageToastify";
import { manageAdmin } from "../services/manageAdmin";
import { manageAdminAction } from "../store/manageAdmin/slice";

const TableCourses = ({ list, colName }) => {
  const { Search } = Input;
  const { isOpen, searchCoursesList } = useSelector(
    (state) => state.manageAdmin
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const listNeedToRender =
    searchCoursesList.length > 0 ? searchCoursesList : list;
  const dispatch = useDispatch();
  // console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(manageAdminAction.closeModal());
  };

  const form = () => {
    return (
      <form
        onSubmit={handleSubmit(async (value) => {
          if (isOpen) {
            const formData = new FormData();
            // formData.append("maKhoaHoc", value.maKhoaHoc);
            // formData.append("biDanh", value.biDanh);
            formData.append("tenKhoaHoc", value.tenKhoaHoc);
            // formData.append("moTa", value.moTa);
            // formData.append("luotXem", value.luotXem);
            // formData.append("danhGia", value.danhGia);
            formData.append("file", value.hinhAnh[0]);
            // formData.append("maNhom", value.maNhom);
            // formData.append("ngayTao", value.ngayTao);
            // formData.append("maDanhMucKhoaHoc", value.maDanhMucKhoaHoc);
            // formData.append("taiKhoanNguoiTao", value.taiKhoanNguoiTao);

            const resImg = await manageAdmin.addNewImage("");
            const res = await manageAdmin.addCourse({
              maKhoaHoc: value.maKhoaHoc,
              biDanh: value.biDanh,
              tenKhoaHoc: value.tenKhoaHoc,
              moTa: value.moTa,
              luotXem: value.luotXem,
              danhGia: value.danhGia,
              hinhAnh: value.hinhAnh[0].name,
              maNhom: value.maNhom,
              ngayTao: value.ngayTao,
              maDanhMucKhoaHoc: value.maDanhMucKhoaHoc,
              taiKhoanNguoiTao: value.taiKhoanNguoiTao,
            });
            if (resImg?.status === 200 && res?.status === 200) {
              message.success("Thêm thành công");
              console.log(resImg);
              console.log(formData.entries());
              // setTimeout(() => {
              //   window.location.reload();
              // }, 1000);
            }
          } else {
            try {
              const formData = new FormData();
              formData.append("maKhoaHoc", user.maKhoaHoc);
              // formData.append("biDanh", value.biDanh);
              formData.append("tenKhoaHoc", value.tenKhoaHoc);
              // formData.append("moTa", value.moTa);
              // formData.append("luotXem", value.luotXem);
              // formData.append("danhGia", value.danhGia);
              formData.append("file", value.hinhAnh[0]);
              // formData.append("maNhom", value.maNhom);
              // formData.append("ngayTao", value.ngayTao);
              // formData.append("maDanhMucKhoaHoc", value.maDanhMucKhoaHoc);
              // formData.append("taiKhoanNguoiTao", value.taiKhoanNguoiTao);

              // const resImg = ;

              const res = await manageAdmin.getUpdateCourse({
                maKhoaHoc: user.maKhoaHoc,
                biDanh: value.biDanh,
                tenKhoaHoc: value.tenKhoaHoc,
                moTa: value.moTa,
                luotXem: value.luotXem,
                danhGia: value.danhGia,
                hinhAnh: value.hinhAnh[0].name,
                maNhom: value.maNhom,
                ngayTao: value.ngayTao,
                maDanhMucKhoaHoc: value.maDanhMucKhoaHoc,
                taiKhoanNguoiTao: value.taiKhoanNguoiTao,
              });
              console.log(value.hinhAnh[0]);
              if (res?.status === 200) {
                await manageAdmin.updateImage(formData);
                console.log(formData.e);
                message.success("Cập nhật thành công");
                // setTimeout(() => {
                //   window.location.reload();
                // }, 1000);
              }
            } catch (e) {
              console.log(e);
            }
          }
        })}
        className="py-6 px-1"
      >
        {isOpen ? (
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="floating_idCourse"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("maKhoaHoc", {
                required: "Vui lòng nhập mã khóa học",
                pattern: {
                  value: /^\w[\w.]{2,14}\w$/,
                  message: "Tài khoản khởi tạo không hợp lệ !",
                },
                maxLength: {
                  value: 8,
                  message: "Tài khoản khởi tạo vượt quá độ dài 16 ký tự !",
                },
                minLength: {
                  value: 4,
                  message: "Tài khoản khởi tạo có độ dài nhỏ hơn 4 ký tự !",
                },
              })}
            />
            <label
              htmlFor="floating_idCourse"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mã khóa học
            </label>
            <p className="text-red-500 font-bold text-xs">
              {errors?.maKhoaHoc?.message}
            </p>
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_courses_name"
            id="floating_courses_name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("tenKhoaHoc", {
              required: "Vui lòng nhập tên khóa học !",
              pattern: {
                // eslint-disable-next-line
                value:
                  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: "Tên khóa học khởi tạo không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.tenKhoaHoc?.message}
          </p>
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tên khóa học
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_nickname"
            id="floating_nickname"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("biDanh", {
              required: "Vui lòng nhập tên khóa học !",
              pattern: {
                // eslint-disable-next-line
                value:
                  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: "Tên bí danh khởi tạo không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.biDanh?.message}
          </p>
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Bí danh
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="textarea"
            name="floating_describe"
            id="floating_describe"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("moTa", {
              required: "Trường này không được bỏ trống !",
              pattern: {
                value:
                  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: "Mô tả có ký tự đặc biệt !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.moTa?.message}
          </p>
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mô tả
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_view"
            id="floating_full_view"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("luotXem", {
              required: "Trường này không được để trống !",
              pattern: {
                value: /^[0-9]+$/,
                message: "Thông tin nhập không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.luotXem?.message}
          </p>
          <label
            htmlFor="floating_full_name"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Lượt xem
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            defaultValue="0"
            name="floating_rate"
            id="floating_rate"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("danhGia", {
              required: "Trường này không được để trống !",
              pattern: {
                value: /^[0-9]+$/,
                message: "Thông tin nhập không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.danhGia?.message}
          </p>
          <label
            htmlFor="floating_full_name"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Đánh giá
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          {/* <input
            type="text"
            name="floating_img"
            id="floating_full_img"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("hinhAnh", {
              required: "Vui lòng nhập tên họ của bạn !",
              pattern: {
                value:
                  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: "Thông tin nhập không hợp lệ !",
              },
            })}
          /> */}
          <input
            name="floating_img"
            id="floating_full_img"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            type="file"
            {...register("hinhAnh")}
          />

          <p className="text-red-500 font-bold text-xs">
            {errors?.hinhAnh?.message}
          </p>
          <label
            htmlFor="floating_full_name"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Hình Ảnh
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_date"
            id="floating_date"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register("ngayTao", {
              required: "Trường này không được để trống!",
              pattern: {
                value:
                  "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                  "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                  "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: "Thông tin nhập không hợp lệ !",
              },
            })}
          />
          <p className="text-red-500 font-bold text-xs">
            {errors?.ngayTao?.message}
          </p>
          <label
            htmlFor="floating_full_name"
            className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Ngày tạo
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="courses"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mã danh mục khóa học
          </label>
          <select
            id="courses"
            {...register("maDanhMucKhoaHoc")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="BackEnd">BackEnd</option>
            <option value="Design">Design</option>
            <option value="DiDong">DiDong</option>
            <option value="FrontEnd">FrontEnd</option>
            <option value="FullStack">FullStack</option>
            <option value="TuDuy">TuDuy</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              defaultValue="GP01"
              name="floating_group_id"
              id="floating_group_id"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("maNhom", {
                required: "Vui lòng nhập mã nhóm !",
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.maNhom?.message}
            </p>
            <label
              htmlFor="floating_group_id"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mã nhóm
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_user_create"
              defaultValue={user?.nguoiTao?.taiKhoan}
              id="floating_user_create"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("taiKhoanNguoiTao", {
                required: "Vui lòng nhập tài khoản !",
                pattern: {
                  value:
                    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                  message: "Thông tin nhập không hợp lệ !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.taiKhoanNguoiTao?.message}
            </p>
            <label
              htmlFor="floating_user_create"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Tài khoản
            </label>
          </div>
        </div>
        {isOpen ? (
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm mới
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
        )}
      </form>
    );
  };
  const renderItem = listNeedToRender?.map((item, id) => {
    return (
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={id}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-[60px] h-[60px] rounded-md object-contain"
            src={item.hinhAnh}
            alt={item.hinhAnh}
          />
        </th>
        <td className="px-6 py-4">{item.tenKhoaHoc}</td>
        <td className="px-6 py-4">{item.ngayTao}</td>
        <td className="px-6 py-4">{item.luotXem}</td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap justify-between items-center">
            {item.soLuongHocVien}
            <div>
              <button
                type="button"
                onClick={() => {
                  setUser(item);
                  reset({ ...item });
                  setTimeout(() => {
                    showModal();
                  }, 200);
                }}
                className="focus:outline-none text-white bg-cyan-400 hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Chỉnh sửa
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await manageAdmin.deleteCourse(
                      `?MaKhoaHoc=${item.maKhoaHoc}`
                    );
                    if (res?.status === 200) {
                      message.success("Đã xóa thành công");
                      setTimeout(() => {
                        window.location.reload();
                      }, 200);
                    }
                  } catch (e) {
                    message.error(e);
                  }
                }}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Xóa
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-end items-center gap-2 pb-4">
        <h2 className="text-lg font-semibold">Tìm kiếm</h2>
        <Search
          placeholder="Nhập từ khóa cần tìm kiếm"
          allowClear
          onChange={(e) => {
            dispatch(
              searchCourses({
                group: "GP01",
                tenKhoaHoc: e.target.value,
              })
            );
          }}
          style={{
            width: "50%",
          }}
        />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {colName.col_1}
            </th>
            <th scope="col" className="px-6 py-3">
              {colName.col_2}
            </th>
            <th scope="col" className="px-6 py-3">
              {colName.col_3}
            </th>
            <th scope="col" className="px-6 py-3">
              {colName.col_4}
            </th>
            <th scope="col" className="px-6 py-3">
              {colName.col_5}
            </th>
          </tr>
        </thead>
        <tbody>{renderItem}</tbody>
      </table>
      <Modal
        open={isOpen || isModalOpen}
        closable={false}
        width={800}
        footer={[
          <button
            type="button"
            key={`${user?.maKhoaHoc}-${isOpen}`}
            onClick={handleCancel}
            className="text-blue-500 hover:text-white border border-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Cancel
          </button>,
        ]}
      >
        {form()}
      </Modal>
    </div>
  );
};

export default TableCourses;
