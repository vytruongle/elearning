import { Pagination, Tabs } from "antd";
import React, { useEffect } from "react";
import Table from "../components/Table";
import { getCoursesList, getUserList } from "../store/manageAdmin/thunkAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  ReadOutlined,
  AuditOutlined,
  UserAddOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { manageAdminAction } from "../store/manageAdmin/slice";
import TableCourses from "../components/TableCourses";

const AdminPage = () => {
  const { userList, coursesList } = useSelector((state) => state.manageAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getUserList({
        maNhom: "GP01",
        soTrang: "1",
      })
    );
    dispatch(
      getCoursesList({
        maNhom: "GP01",
        soTrang: "1",
      })
    );
  }, [dispatch]);

  //cập nhật lại dữ liệu khi đổi trang
  const onChange = (page) => {
    dispatch(
      getUserList({
        maNhom: "GP01",
        soTrang: page,
      })
    );
  };

  const items = [
    {
      key: "1",
      label: (
        <h1 className="text-black font-semibold text-sm hover:bg-gray-300 p-4 flex items-baseline">
          <UserOutlined className="font-semibold text-lg" />
          Quản lý người dùng
        </h1>
      ),
      children: (
        <div className="xl:container mx-auto px-4 flex flex-col flex-wrap gap-4">
          <Table
            list={userList}
            colName={{
              col_1: "Họ & tên",
              col_2: "email",
              col_3: "tài khoản",
              col_4: "Tên loại người dùng",
              col_5: "Số điện thoại",
            }}
          />
          <div className="flex items-center justify-between">
            <div className=" justify-start">
              <button
                type="button"
                onClick={() => {
                  dispatch(manageAdminAction.openModal());
                }}
                className="flex items-baseline gap-1 focus:outline-none text-white bg-lime-600 hover:opacity-90 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <UserAddOutlined className="text-white font-semibold text-lg" />
                Thêm người dùng
              </button>
            </div>
            <div className="flex justify-end">
              <Pagination defaultCurrent={1} total={100} onChange={onChange} />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <h1 className="text-black font-semibold text-sm hover:bg-gray-300 p-4 flex items-baseline">
          <ReadOutlined className="font-semibold text-lg" />
          Quản lý Khóa học
        </h1>
      ),
      children: (
        <div className="xl:container mx-auto px-4 flex flex-col flex-wrap gap-4">
          <TableCourses
            list={coursesList}
            colName={{
              col_1: "Hình ảnh",
              col_2: "Tên khóa học",
              col_3: "Ngày tạo ",
              col_4: "Lượt xem",
              col_5: "Số lượng học viên",
            }}
          />
          <div className="flex items-center justify-between">
            <div className=" justify-start">
              <button
                type="button"
                onClick={() => {
                  dispatch(manageAdminAction.openModal());
                }}
                className="flex items-baseline gap-1 focus:outline-none text-white bg-lime-600 hover:opacity-90 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <PlusOutlined className="text-white font-semibold text-lg" />
                Thêm khóa học
              </button>
            </div>
            <div className="flex justify-end">
              <Pagination
                defaultCurrent={1}
                total={100}
                onChange={(page) => {
                  dispatch(
                    getCoursesList({
                      maNhom: "GP01",
                      soTrang: page,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <h1 className="text-black font-semibold text-sm hover:bg-gray-300 p-4 flex items-baseline">
          <AuditOutlined className="font-semibold text-lg" />
          Quản lý ghi danh
        </h1>
      ),
      children: "3",
    },
  ];
  return (
    <div className=" bg-gray-200 h-full py-14">
      <h1 className="text-black text-4xl font-bold uppercase pb-10 px-8">
        administrator
      </h1>
      <div>
        <Tabs tabPosition="left" items={items} />
      </div>
    </div>
  );
};

export default AdminPage;
