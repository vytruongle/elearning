import { createSlice } from "@reduxjs/toolkit";
import {
  getCourseCategory,
  getCourseCategoryList,
  getCourseList,
  getDetailCourse,
} from "./thunkAction";

const detailCourseLocal = JSON.parse(localStorage.getItem("detailCourse"));

const initialState = {
  courseList: [],
  detailCourse: detailCourseLocal || {},
  courseCategory: [],
  courseCategoryList: [],
  isLoading: false,
};

const manageCourseSlice = createSlice({
  name: "manageCourseSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCourseList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourseList.fulfilled, (state, action) => {
        state.courseList = action.payload;
        state.isLoading = false;
      })
      .addCase(getCourseList.rejected, (state, action) => {
        state.isLoading = true;
        console.log("error");
      })
      //get detail course
      .addCase(getDetailCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDetailCourse.fulfilled, (state, action) => {
        state.detailCourse = action.payload;
        localStorage.setItem("detailCourse", JSON.stringify(action.payload));
        state.isLoading = false;
      })
      .addCase(getDetailCourse.rejected, (state, action) => {
        state.isLoading = true;
        console.log("error");
      })
      //get course category
      .addCase(getCourseCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourseCategory.fulfilled, (state, action) => {
        state.courseCategory = action.payload;
        localStorage.setItem("CourseCategory", JSON.stringify(action.payload));
        state.isLoading = false;
      })
      .addCase(getCourseCategory.rejected, (state, action) => {
        state.isLoading = true;
        console.log("error");
      })
      //get course category list
      .addCase(getCourseCategoryList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourseCategoryList.fulfilled, (state, action) => {
        state.courseCategoryList = action.payload;
        localStorage.setItem(
          "CourseCategoryList",
          JSON.stringify(action.payload)
        );
        state.isLoading = false;
      })
      .addCase(getCourseCategoryList.rejected, (state, action) => {
        state.isLoading = true;
        console.log("error");
      });
  },
});

export const manageCourseReducer = manageCourseSlice.reducer;
export const manageCourseAction = manageCourseSlice.actions;
