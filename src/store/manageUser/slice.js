import { createSlice } from "@reduxjs/toolkit";
import { getInfomation, getLogin, getUpdate } from "./thunkAction";

const localUserAccount = JSON.parse(localStorage.getItem("userAccount"));

const initialState = {
  userAccount: localUserAccount || undefined,
  pwd: undefined,
  listCoursesRegister: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getLogout: (state, action) => {
      localStorage.removeItem("userAccount");
      state.userAccount = undefined;
      state.pwd = undefined;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLogin.fulfilled, (state, action) => {
        state.userAccount = action.payload.userAccount;
        state.pwd = action.payload.pwd;
        localStorage.setItem(
          "userAccount",
          JSON.stringify(action.payload.userAccount)
        );
        localStorage.setItem("pwd", JSON.stringify(action.payload.pwd));
      })
      .addCase(getUpdate.fulfilled, (state, action) => {
        state.userAccount = {
          accessToken: localUserAccount?.accessToken,
          email: action.payload?.email,
          hoTen: action.payload?.hoTen,
          maLoaiNguoiDung: action.payload?.maLoaiNguoiDung,
          maNhom: action.payload?.maNhom,
          soDT: action.payload?.soDt,
          taiKhoan: action.payload?.taiKhoan,
        };
        state.pwd = action.payload?.matKhau;
        localStorage.setItem("userAccount", JSON.stringify(state.userAccount));
        localStorage.setItem("pwd", JSON.stringify(action.payload.pwd));
      })
      // danh sách khóa học đã đăng ký
      .addCase(getInfomation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfomation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCoursesRegister = action.payload?.chiTietKhoaHocGhiDanh;
        localStorage.setItem(
          "listCoursesRegister",
          JSON.stringify(state.listCoursesRegister)
        );
      });
  },
});

export const userSliceReducer = userSlice.reducer;
export const useSliceAction = userSlice.actions;
