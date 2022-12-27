import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { register, clearErrors } from "../../acciones/userActions";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [respuesta, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { nombre, email, password } = respuesta;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      alert.success("Te has registrado correctamente");
    }
    if (error) {
      dispatch(clearErrors);
    }
  }, [dispatch, isAuthenticated, error, alert, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...respuesta, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Registro"} />

      <div className="container-section text-black">
        <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
          <form style={{ width: "23rem" }} onSubmit={submitHandler}>
            <h3
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Registrate
            </h3>

            <div className="form-outline mb-4">
              <input
                type="name"
                id="name_field"
                className="form-control form-control-lg"
                name="nombre"
                value={nombre}
                onChange={onChange}
              />
              <label className="form-label" htmlFor="name_field">
                Nombre
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="email_field"
                className="form-control form-control-lg"
                name="email"
                value={email}
                onChange={onChange}
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
                name="password"
                value={password}
                onChange={onChange}
              />
              <label className="form-label" htmlFor="password_field">
                Contraseña
              </label>
            </div>

            <div className="form-outline mb-4">
              <label htmlFor="avatar_upload">Avatar</label>

              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={avatarPreview}
                    className="rounded-circle"
                    alt="Vistar Previa del Avatar"
                  ></img>
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input"
                  id="customFile"
                  accept="images/*"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="pt-1 mb-4">
              <button
                className="btn btn-info btn-lg btn-block"
                id="btn_login"
                type="submit"
              >
                Registrarse
              </button>
            </div>

            <p>
              Ya tienes una cuenta?
              <Link to="/login" className="link-info">
                Inicia sesion aqui!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
