import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCourse } from "../store/getCoursesList/thunkAction";
import { useNavigate } from "react-router";

const CoursesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseCategoryList } = useSelector((state) => state.manageCourses);

  const renderCoursesList = () => {
    return courseCategoryList?.map((course) => {
      return (
        <div
          key={course.maKhoaHoc}
          className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div>
            <img
              className="rounded-t-lg h-fit w-full object-fill"
              src={course.hinhAnh}
              alt={course.hinhAnh}
            />
          </div>
          <div className="p-5">
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {course.tenKhoaHoc}
              </h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
              {course.moTa}
            </p>
            <button
              onClick={() => {
                dispatch(getDetailCourse(course.maKhoaHoc));
                navigate(`makhoahoc/${course.maKhoaHoc}`);
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {renderCoursesList()}
    </div>
  );
};

export default CoursesList;
