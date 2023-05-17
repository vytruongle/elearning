import React from "react";

import logo from "../data/img/logo.png";
import avatar from "../data/img/wonyoung.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useSliceAction } from "../store/manageUser/slice";
import { useNavigate } from "react-router";
import { getInfomation } from "../store/manageUser/thunkAction";

const Header = () => {
  const { userAccount } = useSelector((state) => state.manageUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="bg-[#f7f5f6] border-gray-200 dark:bg-gray-900 drop-shadow-xl">
      <div className="max-w-screen-xl flex items-center mx-auto p-4 justify-between">
        <a href="/" className="flex items-center">
          <img src={logo} className=" h-16 w-full mr-3" alt="E-learning logo" />
        </a>

        <div className="flex items-center md:order-2">
          {userAccount ? (
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={avatar}
                alt="user avatar"
              />
              <p
                onClick={() => {
                  dispatch(getInfomation(""));
                  if (userAccount.maLoaiNguoiDung === "HV") {
                    navigate("/thongtincanhan");
                  } else {
                    navigate("/admin");
                  }
                }}
                className="text-black text-lg font-semibold cursor-pointer hover:text-green-500"
              >
                Xin chào {userAccount?.hoTen}
              </p>
              <p className="text-black text-xl font-bold">|</p>
              <p
                onClick={() => {
                  dispatch(useSliceAction.getLogout());
                  navigate("/login");
                }}
                className="text-black text-xl font-semibold hover:text-red-500 cursor-pointer"
              >
                Đăng xuất
              </p>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <a
                href="/login"
                className="text-black text-xl font-semibold hover:text-green-500 cursor-pointer"
              >
                Đăng nhập
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
