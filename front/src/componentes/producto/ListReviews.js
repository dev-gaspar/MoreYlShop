import React from "react";

const ListReviews = ({ opiniones }) => {
  return (
    <div className="reviews w-90 p-5">
      <h3>Opiniones de otros clientes:</h3>
      <hr />
      {opiniones &&
        opiniones.map((opinion) => (
          <div key={opinion._id} className="review-card my-2">
            <p className="review_user">por {opinion.nombreCliente}</p>
            <div className="rating-outer" style={{ margin: "auto" }}>
              <div
                className="rating-inner"
                style={{ width: `${(opinion.rating / 5) * 100}%` }}
              ></div>
            </div>

            <p className="review_comment">{opinion.comentario}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
