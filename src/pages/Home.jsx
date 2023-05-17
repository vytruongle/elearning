import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseCategory,
  getCourseCategoryList,
  getCourseList,
  getDetailCourse,
} from "../store/getCoursesList/thunkAction";
import { useNavigate } from "react-router";
import clsx from "clsx";

//scss
import styles from "../scss/Loader.module.scss";
import { Tabs } from "antd";
import CoursesList from "../components/CoursesList";

const Home = () => {
  const [key, setKey] = useState(1);
  const dispatch = useDispatch();
  const { isLoading, courseList, courseCategory } = useSelector(
    (state) => state.manageCourses
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourseList("GP01"));
    dispatch(getCourseCategory());
  }, [dispatch]);

  const renderCoursesList = () => {
    return courseList?.map((course) => {
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

  const categoryList = courseCategory.map((item) => {
    return {
      key: item.maDanhMuc,
      label: (
        <button
          onClick={() => {
            setKey(item.maDanhMuc);
            dispatch(
              getCourseCategoryList({
                maDanhMuc: item.maDanhMuc,
                maNhom: "GP01",
              })
            );
          }}
          className="text-lg text-black font-semibold"
        >
          {item.tenDanhMuc}
        </button>
      ),
      children: <CoursesList />,
    };
  });

  const items = [
    {
      key: "1",
      label: <h1 className="text-lg text-black font-semibold">Tất cả</h1>,
      children: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {renderCoursesList()}
        </div>
      ),
    },
    ...categoryList,
  ];

  if (isLoading) {
    return (
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.top)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.bottom)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.left)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.right)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="xl:container mx-auto px-48 py-12 bg-gray-200">
        <div className="flex flex-col h-full gap-3">
          <h1 className="text-4xl font-bold text-black">Danh sách khóa học</h1>
          <Tabs defaultActiveKey={key} items={items} />
        </div>
      </div>
    </div>
  );
};

export default Home;
