import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../acciones/userActions";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Olvide mi contraseña"} />

      <div className="container-section text-black">
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form onSubmit={submitHandler} style={{ width: "23rem" }}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Cambiar contraseña
            </h3>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email_field"
                className="form-control form-control-lg"
                value={email}
                placeholder="ejemplo@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email_field">Email registrado</label>
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn mb-5"
              disabled={loading ? true : false}
            >
              Recuperar
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
