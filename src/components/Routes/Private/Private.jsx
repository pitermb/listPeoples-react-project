import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import StoreContext from "../../Store/Context";

const RoutesPrivate = ({ children, ...rest }) => {
  const { token } = useContext(StoreContext);

  return token ? children : <Navigate to="/login" />;
};

export default RoutesPrivate;
