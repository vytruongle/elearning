import { configureStore } from "@reduxjs/toolkit";
import { manageCourseReducer } from "./getCoursesList/slice";
import { userSliceReducer } from "./manageUser/slice";
import { manageAdminReducer } from "./manageAdmin/slice";

const store = configureStore({
  reducer: {
    manageCourses: manageCourseReducer,
    manageUser: userSliceReducer,
    manageAdmin: manageAdminReducer,
  },
});

export default store;
