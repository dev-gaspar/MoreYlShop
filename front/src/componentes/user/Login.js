import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { login, clearErrors } from "../../acciones/userActions";
import { useDispatch, useSelector } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      dispatch(clearErrors);
    }
  }, [dispatch, isAuthenticated, error, loading, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      <MetaData title={"Inicie Sesion"} />

      <div className="container-section text-black">
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form style={{ width: "23rem" }} onSubmit={submitHandler}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Inicia sesion
            </h3>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="email_field"
                className="form-control form-control-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" htmlFor="email_field">
                Email
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="password_field"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" htmlFor="password_field">
                Contraseña
              </label>
            </div>

            <div className="pt-1 mb-4">
              <button
                className="btn btn-info btn-lg btn-block"
                id="btn_login"
                type="submit"
                onClick={submitHandler}
              >
                Login
              </button>
            </div>

            <p className="small mb-5 pb-lg-2">
              <Link className="text-muted" to="/recuperar-contrasena">
                Olvidaste tu contraseña?
              </Link>
            </p>
            <p>
              Aun no creas una cuenta?
              <Link to="/register" className="link-info">
                Registrate aqui!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
