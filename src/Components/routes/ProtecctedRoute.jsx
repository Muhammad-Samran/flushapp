import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Protectedroute = ({ isAuth, children }) => {
  const { isAuthorized } = useSelector((state) => state.isAuthorized);

  return isAuthorized ? { children } : <Navigate to="/login" />;
};

export default Protectedroute;
