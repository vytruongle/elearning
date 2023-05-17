import React from "react";
import clsx from "clsx";

import styles from "../scss/Loader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { message } from "../module/MessageToastify";
import { addCourse, removeCourse } from "../store/getCoursesList/thunkAction";

const DetailCourse = () => {
  const { detailCourse, isLoading } = useSelector(
    (state) => state.manageCourses
  );
  const { userAccount } = useSelector((state) => state.manageUser);

  const dispatch = useDispatch();

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
    <div className="xl:container mx-auto px-48 py-12 bg-gray-200">
      <div className="flex gap-8 items-center">
        <div className="flex flex-col h-full gap-2 basis-1/3">
          <img
            src={detailCourse.hinhAnh}
            alt={detailCourse.hinhAnh}
            className="w-full h-1/2 rounded-lg drop-shadow-lg"
          />
          <h1 className="text-black font-bold text-2xl">
            {detailCourse.tenKhoaHoc}
          </h1>
          <h3 className="text-black text-xl font-semibold">
            Danh mục khoá học:
            <span className="ml-1 text-lg text-gray-500">
              {detailCourse.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </span>
          </h3>
          <p className="text-black text-xl font-semibold">
            Lượt xem:
            <span className="ml-1 text-lg text-gray-500">
              {detailCourse.luotXem}
            </span>
          </p>
          <p className="text-black text-xl font-semibold">
            Số lượng học viên hiện tại:
            <span className="ml-1 text-lg text-gray-500">
              {detailCourse.soLuongHocVien}
            </span>
          </p>
        </div>
        <div className="basis-2/3 flex flex-col gap-5">
          <p className="text-black text-lg ">{detailCourse.moTa}</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => {
                dispatch(
                  addCourse({
                    maKhoaHoc: detailCourse.maKhoaHoc,
                    taiKhoan: userAccount.taiKhoan,
                  })
                );
                message.success("Bạn đã đăng ký thành công");
              }}
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-1/4"
            >
              Đăng ký khóa học
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(
                  removeCourse({
                    maKhoaHoc: detailCourse.maKhoaHoc,
                    taiKhoan: userAccount.taiKhoan,
                  })
                );
                message.success("Bạn đã hủy khóa học");
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Hủy bỏ khóa học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCourse;
