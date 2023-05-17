import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAdmin } from "../../services/manageAdmin";

// quản ly người dùng
export const getUserList = createAsyncThunk(
  "manageAdmin/getUserList",
  async (payload, thunkApi) => {
    try {
      const res = await manageAdmin.getUserList(
        `?MaNhom=${payload.maNhom}&page=${payload.soTrang}&pageSize=10`
      );
      return res?.data?.items;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getUpdate = createAsyncThunk(
  "manageAdmin/getUpdate",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageAdmin.getUpdate(payload);
      return res?.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const searchUser = createAsyncThunk(
  "manageAdmin/getUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageAdmin.searchUser(
        `?MaNhom=${payload.group}&tuKhoa=${payload.word}`
      );
      return res?.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

// quản lý khóa học
export const getCoursesList = createAsyncThunk(
  "manageAdmin/getCoursesList",
  async (payload, thunkApi) => {
    try {
      const res = await manageAdmin.getCoursesList(
        `?MaNhom=${payload.maNhom}&page=${payload.soTrang}&pageSize=10`
      );
      return res?.data?.items;
    } catch (err) {
      console.log(err);
    }
  }
);

export const searchCourses = createAsyncThunk(
  "manageAdmin/searchCourses",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageAdmin.searchCourses(
        `?tenKhoaHoc=${payload.tenKhoaHoc}&MaNhom=${payload.group}`
      );
      return res?.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateImage = createAsyncThunk(
  "manageAdmin/updateImage",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageAdmin.updateImage(payload);
      return res?.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
