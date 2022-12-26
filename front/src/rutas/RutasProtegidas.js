import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../acciones/userActions";

const RutasProtegidas = ({ children, isAdmin }) => {
  const {
    isAuthenticated = false,
    loading = true,
    respuesta,
  } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!respuesta) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading, dispatch, respuesta]);

  if (loading) return <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>;

  if (loading === false && isAuthenticated) {
    if ((isAdmin === true) & (respuesta.role !== "admin")) {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default RutasProtegidas;
