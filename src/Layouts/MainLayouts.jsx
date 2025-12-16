import React, { use } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import Loading from "../Components/Loading/Loading";

const MainLayouts = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
