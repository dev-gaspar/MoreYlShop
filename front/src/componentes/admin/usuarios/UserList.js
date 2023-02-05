import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Nav from "../navAdmin/Nav";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  deleteUser,
  clearErrors,
} from "../../../acciones/userActions";
import { DELETE_USER_RESET } from "../../../constantes/userConstants";

const UsersList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Usuario Eliminado correctamente");
      navigate("/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "ID Usuario",
          field: "id",
          sort: "asc",
        },
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Rol",
          field: "rol",
          sort: "asc",
        },
        {
          label: "Acciones",
          field: "acciones",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.role,

        acciones: (
          <Fragment>
            <Link
              to={`/users/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Usuarios Registrados"} />
      <div className="container-section">
        <div className="row" style={{ "--bs-gutter-x": "none" }}>
          <div className="col-12 col-md-3">
            <Nav />
          </div>
          <div className="col-12 col-md-9">
            <Fragment>
              <h1 className="my-4 mx-2">Usuarios Registrados</h1>

              {loading ? (
                <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              ) : (
                <MDBDataTable
                  data={setUsers()}
                  className="px-3"
                  bordered
                  striped
                  hover
                  responsive={true}
                />
              )}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
