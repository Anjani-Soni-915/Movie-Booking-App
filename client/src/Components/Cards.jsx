import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, image, title, likes }) => {
  return (
    <div>
      <div className="card">
        <Link to={`/show/${id}`}>
          <img src={image} alt="image" className="card-image" />
        </Link>

        <div className="card-content">
          <h1 className="card-title">{title}</h1>
          <p className="card-description">💝{likes} likes</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
