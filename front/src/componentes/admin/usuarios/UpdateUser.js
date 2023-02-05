import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../../layout/MetaData";
import Nav from "../navAdmin/Nav";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../../acciones/userActions";
import { UPDATE_USER_RESET } from "../../../constantes/userConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const userId = params.id;

  useEffect(() => {
    console.log(user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setNombre(user.nombre);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Usuario actualizado correctamente");

      navigate("/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated, userId, user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Actualizar Usuario`} />
      <div className="container-section">
        <div className="row" style={{ "--bs-gutter-x": "none" }}>
          <div className="col-12 col-md-3">
            <Nav />
          </div>

          <div className="col-12 col-md-9">
            <Fragment>
              <div className="d-flex justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "32rem" }} onSubmit={submitHandler}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Actualizar usuario
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      type="name"
                      id="name_field"
                      className="form-control form-control-lg"
                      name="name"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <label htmlFor="name_field">Nombre</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email_field"
                      className="form-control form-control-lg"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email_field">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <select
                      id="role_field"
                      className="form-control form-control-lg"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">Usuario Regular</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <label htmlFor="role_field">Role</label>
                  </div>

                  <button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                  >
                    Actualizar
                  </button>
                </form>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
