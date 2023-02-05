import React from "react";
import { Link } from "react-router-dom";

export const Producto = ({ producto }) => {
  //aMonda
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 p-2 best">
      <div
        className="collection-img position-relative"
        style={{
          background: "#f2efe8",
        }}
      >
        <Link to={`/producto/${producto._id}`}>
          <img
            src={producto.imagen[0].url}
            alt={producto.nombre}
            className="w-100"
          />
        </Link>
        {producto.precio <= 30000 ? (
          <span className="position-absolute bg-primary text-white d-flex align-items-center justify-content-center">
            sale
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="text-center">
        <div className="rating mt-auto">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{
                width: `${(producto.calificacion / 5) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <p
          className="text-capitalize my-1"
          style={{
            "box-sizing": "border-box",
            "text-overflow": "ellipsis",
            overflow: "hidden",
            "white-space": "nowrap",
            width: "100%",
          }}
        >
          {producto.nombre}
        </p>
        <span className="fw-bold">{f.format(producto.precio)}</span>
      </div>
    </div>
  );
};

export default Producto;
