import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Card from "./Components/Cards";
import Slider from "react-slick";
import Footer from "./Components/Footer";
import axiosInstance from "./Components/AxiosInterceptor";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowDetail from "./Components/ShowDetails";
import TheatreListing from "./Components/TheatreListing";
import Seats from "./Components/Seats";
import Razorpay from "./Components/Razorpay";
import BookingDetails from "./Components/BookingDetails";
import Page from "./Components/Page"

const App = () => {
  const [movies, setMovies] = useState([]);
  const [plays, setPlays] = useState([]);
  const [error, setError] = useState(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    // dots:true,
  };

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get(`/show?category=movie`);
      const data = response.data;

      if (data && data.data && Array.isArray(data.data.rows)) {
        setMovies(data.data.rows);
      } else {
        console.error("Data is not in expected format:", data);
        setMovies([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    }
  };

  const fetchPlays = async () => {
    try {
      const response = await axiosInstance.get(`/show?category=Play`);
      const data = response.data;

      if (data && data.data && Array.isArray(data.data.rows)) {
        setPlays(data.data.rows);
      } else {
        console.error("Data is not in expected format:", data);
        setPlays([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchPlays();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              {error && <p>Error: {error}</p>}
              <div className="heading">
                <h4>Recommended Movies</h4>
              </div>

              <Slider {...settings}>
                {movies.slice(0, 10).map((movie) => (
                  <div className="card-container" key={movie.id}>
                    <Card
                      id={movie.id}
                      image={movie.image.poster}
                      title={movie.showName}
                      likes={movie.likes}
                    />
                  </div>
                ))}
              </Slider>

              <img
                src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png"
                id="blackImg"
                alt="IMAGE"
              />

              <div className="heading">
                <h4>Popular Dramas</h4>
              </div>

              <Slider {...settings}>
                {plays.slice(0, 10).map((play) => (
                  <div className="card-container" key={play.id}>
                    <Card
                      id={play.id}
                      image={play.image.poster}
                      title={play.showName}
                      likes={play.likes}
                    />
                  </div>
                ))}
              </Slider>
            </>
          }
        />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/theatre/:id" element={<TheatreListing />} />
        <Route path="/seats/" element={<Seats />} />
        <Route path="/razorpay/:selectedSeatsString/:totalPrice" element={<Razorpay />}/>
        <Route path="/bookingDetails" element={<BookingDetails />} />
        <Route path="/movies" element={<Page movies={movies} />} />
        <Route path="/plays" element={<Page movies={plays} />} />

        <Route path="/help"
          element={
            <>
              <h2>Call us at 📞1800 400 400 </h2>
              <h2>Or Mail us at 📧spotlyte@gmail.com</h2>{" "}
            </>
          }
        />
      </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;
