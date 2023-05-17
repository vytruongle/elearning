import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-col h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
