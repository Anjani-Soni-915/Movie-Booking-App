import React from "react";
import { Link } from "react-router-dom";

const Page = ({ movies }) => {
  return (
    <>
     <h2>Watch your favoirite show...</h2>
    <div className="page-container">
      {movies.map((movie) => (
        <div className="card1" key={movie.id}>
          {/* <img src={movie.image.poster} alt={movie.showName} /> */}
          <Link to={`/show/${movie.id}`}>
          <img src={movie.image.poster} alt="image" className="card1-image" />
        </Link>
          <div className="card1-content">
            <h3>{movie.showName}</h3>
            <p>💖{movie.likes} Likes</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Page;
