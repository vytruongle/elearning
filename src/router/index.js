import { useRoutes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DetailCourse from "../pages/DetailCourse";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PersonalInfomation from "../pages/PersonalInfomation";
import AdminPage from "../pages/AdminPage";

const Router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "makhoahoc/:idCourse",
          element: <DetailCourse />,
        },
        {
          path: "/thongtincanhan",
          element: <PersonalInfomation />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return element;
};

export default Router;
