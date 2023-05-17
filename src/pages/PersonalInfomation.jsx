import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getInfomation, getUpdate } from "../store/manageUser/thunkAction";
import { removeCourse } from "../store/getCoursesList/thunkAction";

const PersonalInfomation = () => {
  const { userAccount, pwd, listCoursesRegister } = useSelector(
    (state) => state.manageUser
  );

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getInfomation(""));
  }, [dispatch]);

  useEffect(() => {
    if (userAccount) return reset({ ...userAccount, matKhau: pwd });
  }, [userAccount, reset, pwd]);

  const renderPersonalInfomation = () => {
    return (
      <div>
        <h1 className="text-black text-4xl font-bold pb-6">
          Cập nhật thông tin
        </h1>
        <form
          onSubmit={handleSubmit((value) => {
            dispatch(
              getUpdate({
                taiKhoan: value.taiKhoan,
                matKhau: value.matKhau,
                email: value.email,
                soDT: value.soDT,
                maNhom: value.maNhom,
                maLoaiNguoiDung: value.maLoaiNguoiDung,
                hoTen: value.hoTen,
              })
            );
          })}
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="floating_username"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("taiKhoan", {
                required: "Vui lòng nhập tài khoản !",
                pattern: {
                  value: /^\w[\w.]{2,12}\w$/,
                  message: "Tài khoản khởi tạo không hợp lệ !",
                },
                maxLength: {
                  value: 14,
                  message: "Tài khoản khởi tạo vượt quá độ dài 14 ký tự !",
                },
                minLength: {
                  value: 4,
                  message: "Tài khoản khởi tạo có độ dài nhỏ hơn 4 ký tự !",
                },
              })}
            />
            <label
              htmlFor="floating_username"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
            <p className="text-red-500 font-bold text-xs">
              {errors?.taiKhoan?.message}
            </p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("email", {
                required: "Vui lòng nhập email !",
                pattern: {
                  // eslint-disable-next-line
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email khởi tạo không hợp lệ !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.email?.message}
            </p>
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("matKhau", {
                required: "Vui lòng nhập mật khẩu !",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                  message: "Mật khẩu khởi tạo không hợp lệ !",
                },
                maxLength: {
                  value: 16,
                  message: "Mật khẩu khởi tạo vượt quá độ dài 16 ký tự !",
                },
                minLength: {
                  value: 8,
                  message: "Mật khẩu khởi tạo có độ dài nhỏ hơn 8 ký tự !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.matKhau?.message}
            </p>
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>
          <div className="z-0 w-full mb-6 group">
            <label
              htmlFor="chucVu"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              defaultValue="HV"
              id="chucVu"
              {...register("maLoaiNguoiDung")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="HV">HV</option>
              <option value="GV">GV</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_fullname"
              id="floating_full_name"
              className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("hoTen", {
                required: "Vui lòng nhập tên họ của bạn !",
                pattern: {
                  value:
                    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                  message: "Tên của bạn không hợp lệ !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.hoTen?.message}
            </p>
            <label
              htmlFor="floating_full_name"
              className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full name
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_group_ID"
                id="floating_group_ID"
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
                htmlFor="floating_group_ID"
                className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Group ID
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("soDT", {
                  required: "Vui lòng nhập số điện thoại !",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Số điện thoại khởi tạo không hợp lệ !",
                  },
                })}
              />
              <p className="text-red-500 font-bold text-xs">
                {errors?.soDT?.message}
              </p>
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
        </form>
      </div>
    );
  };

  const renderListCourses = () => {
    if (listCoursesRegister.length > 0) {
      return listCoursesRegister?.map((item) => {
        return (
          <div
            className="flex flex-wrap items-center justify-between py-3"
            key={item.maKhoaHoc}
          >
            <div className="flex flex-wrap gap-4">
              <div className="w-[60px] h-[60px]">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={item.hinhAnh}
                  alt={item.hinhAnh}
                />
              </div>
              <div>
                <h1 className="text-black font-bold text-sm">
                  {item.tenKhoaHoc}
                </h1>
                <p className="text-black text-sm">
                  Đánh giá:{" "}
                  <span className="text-lg font-semibold text-green-500">
                    {item.danhGia}
                  </span>
                  /10
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                dispatch(
                  removeCourse({
                    maKhoaHoc: item.maKhoaHoc,
                    taiKhoan: userAccount.taiKhoan,
                  })
                );
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              DELETE
            </button>
          </div>
        );
      });
    } else {
      return (
        <h1 className="text-black font-semibold text-xl">
          Chưa có khóa học đăng ký nào{" "}
        </h1>
      );
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <h1 className="text-black text-lg font-semibold">Thông tin cá nhân</h1>
      ),
      children: renderPersonalInfomation(),
    },
    {
      key: "2",
      label: (
        <h1 className="text-black text-lg font-semibold">
          Danh sách khóa học đã đăng ký
        </h1>
      ),
      children: renderListCourses(),
    },
  ];
  return (
    <div className="xl:container mx-auto px-48 py-12 bg-gradient-to-r from-gray-200 to-white">
      <Tabs defaultActiveKey="1" tabPosition="left" items={items} />
    </div>
  );
};

export default PersonalInfomation;
