import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./AxiosInterceptor";
import { Link } from "react-router-dom";


const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axiosInstance.get(`/show/${id}`);
        const data = response.data.data;

        if (data) {
          setShow(data);
        } else {
          setError("Show not found");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching show details:", error);
        setError("Failed to fetch show details");
        setIsLoading(false);
      }
    };
    fetchShow();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const showType = show ? Object.values(show.showType || {}) : [];
  const castImg = show ? Object.values(show.cast || {}) : [];
  const crewImg = show ? Object.values(show.crew || {}) : [];


  return (
    <div className="show-container">
       
      {show ? (
        <div className="box">
          <div className="banner-container">
            <img
              src={show.image?.banner || "default-banner.jpg"}
              alt="Banner"
              className="banner-image"
            />
            <div className="poster-overlay">
              <img
                src={show.image?.poster || "default-poster.jpg"}
                alt="Poster"
                className="poster-image"
              />
            </div>
            <div className="banner-content">
              <h1>{show.showName}</h1>
            </div>
            <div className="details">
              <div className="language">
                <h4>{show.language}</h4>
              </div>
              <div className="duration">
                <h4>{show.duration},</h4>
                {showType.length > 0 ? (
                  showType.map((type, index) => <h4 key={index}>{type}</h4>)
                ) : (
                  <p>No show types available</p>
                )}
              </div>
              <Link to={`/theatre/${id}`}>
              <button id="book">Book Tickets</button>
              </Link>
            </div>
          </div>
          <h3>Description</h3>
          <p className="description"> •
            {show.description || "No Description Available"}
          </p>
          <h3>Cast</h3>
          <div className="cast-container">
            {castImg.length > 0 ? (
              castImg.map((image, index) => (
                <div className="cast-image" key={index}>
                  <img
                    src={image}
                    alt={`Cast ${index + 1}`}
                    className="cast-img"
                  />
                </div>
              ))
            ) : (
              <p>No cast images available</p>
            )}
          </div>
          <h3>Crew</h3>
          <div className="cast-container">
            {crewImg.length > 0 ? (
              crewImg.map((image, index) => (
                <div className="cast-image" key={index}>
                  <img
                    src={image}
                    alt={`Cast ${index + 1}`}
                    className="cast-img"
                  />
                </div>
              ))
            ) : (
              <p>No cast images available</p>
            )}
          </div>
        </div>
      ) : (
        <p className="no-product">Product not found</p>
      )}
    </div>
  );
};

export default ShowDetail;
