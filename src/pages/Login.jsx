import React from "react";
import clsx from "clsx";

import styles from "../scss/Login.module.scss";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../store/manageUser/thunkAction";

const Login = () => {
  const dispatch = useDispatch();
  const { userAccount } = useSelector((state) => state.manageUser);
  const { register, handleSubmit } = useForm();
  return (
    <div className="bg-[#f4f4f4] flex flex-col items-center h-[100vh]">
      {userAccount && <Navigate to="/" replace={true} />}
      <form
        className={clsx(styles.form, "my-auto")}
        onSubmit={handleSubmit((value) => {
          dispatch(getLogin(value));
        })}
      >
        <p className={clsx(styles.formTitle)}>Sign in to your account</p>
        <div className={clsx(styles.inputContainer)}>
          <label htmlFor="account" className="text-black font-semibold text-md">
            Username
          </label>

          <input
            id="account"
            placeholder="Enter account"
            type="text"
            {...register("taiKhoan", {
              required: "Vui lòng nhập tài khoản !",
              maxLength: {
                value: 14,
                message: "Tài khoản nhập vượt quá độ dài 14 ký tự !",
              },
              minLength: {
                value: 4,
                message: "Tài khoản nhập có độ dài nhỏ hơn 4 ký tự !",
              },
            })}
          />
        </div>
        <div className={clsx(styles.inputContainer)}>
          <label
            htmlFor="password"
            className="text-black font-semibold text-md"
          >
            Password
          </label>

          <input
            id="password"
            placeholder="Enter password"
            type="password"
            {...register("matKhau", {
              required: "Vui lòng nhập mật khẩu !",
              maxLength: {
                value: 16,
                message: "Mật khẩu nhập vượt quá độ dài 16 ký tự !",
              },
              minLength: {
                value: 8,
                message: "Mật khẩu nhập có độ dài nhỏ hơn 8 ký tự !",
              },
            })}
          />
          <span>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <button className={clsx(styles.submit)} type="submit">
          Sign in
        </button>
        <p className={clsx(styles.signupLink)}>
          No account?
          <a
            className="text-lg text-red-500 font-semibold hover:text-red-400"
            href="/register"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
