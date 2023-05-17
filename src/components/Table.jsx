import { Modal } from "antd";
import { Input } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUpdate, searchUser } from "../store/manageAdmin/thunkAction";
import { message } from "../module/MessageToastify";
import { manageAdmin } from "../services/manageAdmin";
import { manageAdminAction } from "../store/manageAdmin/slice";

const Table = ({ list, colName }) => {
  const { Search } = Input;
  const { isOpen, searchList } = useSelector((state) => state.manageAdmin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const listNeedToRender = searchList.length > 0 ? searchList : list;
  const dispatch = useDispatch();
  //   console.log(user);
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
            const res = await manageAdmin.addUser({
              taiKhoan: value.taiKhoan,
              email: value.email,
              soDT: value.soDT,
              matKhau: value.matKhau,
              maNhom: value.maNhom,
              maLoaiNguoiDung: value.maLoaiNguoiDung,
              hoTen: value.hoTen,
            });
            if (res?.status === 200) {
              message.success("Cập nhật thành công");
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          } else {
            dispatch(
              getUpdate({
                taiKhoan: value.taiKhoan,
                email: value.email,
                soDT: value.soDT,
                matKhau: value.matKhau,
                maNhom: value.maNhom,
                maLoaiNguoiDung: value.maLoaiNguoiDung,
                hoTen: value.hoTen,
              })
            );
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }
        })}
        className="py-6 px-1"
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
            Mã loại người dùng
          </label>
          <select
            defaultValue={user.maLoaiNguoiDung}
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
              defaultValue="GP01"
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
              value={user.soDT}
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
          {item.hoTen}
        </th>
        <td className="px-6 py-4">{item.email}</td>
        <td className="px-6 py-4">{item.taiKhoan}</td>
        <td className="px-6 py-4">{item.tenLoaiNguoiDung}</td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap justify-between items-center">
            {item.soDT ? item.soDT : "none"}
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
                  const res = await manageAdmin.deleteUser(
                    `?TaiKhoan=${item.taiKhoan}`
                  );
                  if (res?.status === 200) {
                    message.success("Đã xóa thành công");
                    setTimeout(() => {
                      window.location.reload();
                    }, 200);
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
              searchUser({
                group: "GP01",
                word: e.target.value,
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
            key={`${user?.taiKhoan}-${isOpen}`}
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

export default Table;
