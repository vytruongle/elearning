import { createSlice } from "@reduxjs/toolkit";
import {
  getCoursesList,
  getUserList,
  searchCourses,
  searchUser,
} from "./thunkAction";

const initialState = {
  userList: [],
  searchList: [],
  coursesList: [],
  searchCoursesList: [],
  isOpen: false,
  isLoading: false,
};

const adminSLice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder
      //quản lý người dùng
      .addCase(getUserList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
      })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchList = action.payload;
      })
      //quản ly khóa học
      .addCase(getCoursesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoursesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coursesList = action.payload;
      })
      .addCase(searchCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchCoursesList = action.payload;
      });
  },
});

export const manageAdminReducer = adminSLice.reducer;
export const manageAdminAction = adminSLice.actions;
