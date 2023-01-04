import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../acciones/userActions";

export const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/login");
      alert.success("Contraseña reiniciada correctamente");
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(params.token, formData));
  };
  return (
    <Fragment>
      <MetaData title={"Reinicio de contraseña"} />

      <div className="container-section text-black">
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form style={{ width: "23rem" }} onSubmit={submitHandler}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Nueva contraseña
            </h3>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="password_field"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password_field">Contraseña</label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="confirm_password_field"
                className="form-control form-control-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirm_password_field">
                Confirmar Contraseña
              </label>
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn mt-4 mb-3"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
