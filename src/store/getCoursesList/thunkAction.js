import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageCourses } from "../../services/manageCourse";

export const getCourseList = createAsyncThunk(
  "manageCourse/getCourseList",
  async (payload, thunkApi) => {
    const res = await manageCourses.getCourseList(`?MaNhom=${payload}`);
    return res.data;
  }
);

export const getDetailCourse = createAsyncThunk(
  "manageCourse/getDetailCourse",
  async (payload, thunkApi) => {
    const res = await manageCourses.getDetailCourse(`?maKhoaHoc=${payload}`);
    return res.data;
  }
);

export const getCourseCategory = createAsyncThunk(
  "manageCourse/getCourseCategory",
  async (payload, thunkApi) => {
    const res = await manageCourses.getCourseCategory();
    return res.data;
  }
);

export const getCourseCategoryList = createAsyncThunk(
  "manageCourse/getCourseCategoryList",
  async (payload, thunkApi) => {
    const res = await manageCourses.getCourseCategoryList(
      `?maDanhMuc=${payload.maDanhMuc}&MaNhom=${payload.maNhom}`
    );
    return res.data;
  }
);

export const addCourse = createAsyncThunk(
  "manageUser/addCourse",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageCourses.addCourse(payload);
      return res?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeCourse = createAsyncThunk(
  "manageUser/removeCourse",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageCourses.removeCourse(payload);
      return res?.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
