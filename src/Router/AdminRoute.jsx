import React, { use } from "react";

import Loading from "../Components/Loading/Loading";
import useRole from "../hooks/useRole";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import Forbidden from "../Components/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = use(AuthContext);
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
