/* eslint-disable no-useless-concat */
/* eslint-disable no-useless-escape */
import React from "react";
import clsx from "clsx";

import styles from "../scss/Register.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import manageUser from "../services/manageUser";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: onchange });
  const navigate = useNavigate();

  const renderRegister = () => {
    return (
      <div className={clsx(styles.card)}>
        <div className={clsx(styles.cardHeader)}>
          <div className={clsx(styles.textHeader)}>REGISTER</div>
        </div>
        <div className={clsx(styles.cardBody)}>
          <form
            onSubmit={handleSubmit(async (value) => {
              try {
                const res = await manageUser.getRegister(value);
                if (res.data.statusCode !== 400) {
                  // message.success("Bạn đã đăng ký thành công");
                  navigate("/login");
                }
              } catch (err) {
                console.log(err.message);
              }
              // const res = await manageUser.getRegister(value);
              // console.log(res);
            })}
          >
            <div className={clsx(styles.formGroup)}>
              <label htmlFor="username">Username:</label>
              <input
                className={clsx(styles.formControl)}
                name="username"
                id="username"
                type="text"
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
              <p className="text-red-500 font-bold text-xs">
                {errors?.taiKhoan?.message}
              </p>
            </div>
            <div className={clsx(styles.formGroup)}>
              <label htmlFor="password">Password:</label>
              <input
                className={clsx(styles.formControl)}
                name="password"
                id="password"
                type="password"
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
            </div>
            <div className={clsx(styles.formGroup)}>
              <label htmlFor="email">Email:</label>
              <input
                className={clsx(styles.formControl)}
                name="email"
                id="email"
                type="email"
                {...register("email", {
                  required: "Vui lòng nhập email !",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email khởi tạo không hợp lệ !",
                  },
                })}
              />
              <p className="text-red-500 font-bold text-xs">
                {errors?.email?.message}
              </p>
            </div>
            <div className={clsx(styles.formGroup)}>
              <label htmlFor="phone-number">Phone number:</label>
              <input
                className={clsx(styles.formControl)}
                name="phone-number"
                id="phone-number"
                type="text"
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
            </div>
            <div className={clsx(styles.formGroup)}>
              <label htmlFor="group-id">Group ID:</label>
              <input
                className={clsx(styles.formControl)}
                name="group-id"
                id="group-id"
                type="text"
                {...register("maNhom", {
                  required: "Vui lòng nhập mã nhóm !",
                })}
              />
              <p className="text-red-500 font-bold text-xs">
                {errors?.maNhom?.message}
              </p>
            </div>
            <div className={clsx(styles.formGroup)}>
              <label htmlFor="full-name">Full name:</label>
              <input
                className={clsx(styles.formControl)}
                name="full-name"
                id="full-name"
                type="text"
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
            </div>
            <input
              type="submit"
              className={clsx(styles.btn, "w-full cursor-pointer")}
              defaultValue="submit"
            />
          </form>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-[#f4f4f4] flex flex-col items-center h-[100vh]">
      <div className="flex flex-col items-center p-10">
        <p className="text-black text-4xl font-semibold pb-4">Register</p>
        {renderRegister()}
        <p className="text-sm text-gray-400 items-start">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-xl text-black font-semibold hover:text-red-500"
          >
            Login !
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
