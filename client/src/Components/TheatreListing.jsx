import React, { useState, useEffect } from "react";
import axiosInstance from "./AxiosInterceptor";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import img from "../assets/c5.png";
import Seats from "./Seats";

Modal.setAppElement("#root");

function TheatreListing() {
  const { id } = useParams();
  const [theatres, setTheatres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTiming, setSelectedTiming] = useState("");
  const [selectedThreater,setSelectedThreater] = useState("");
  const [seats, setSeats] = useState(1);
  const [threaterName,  setThreaterName] = useState("");

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        if (!id) {
          setError("No show ID provided");
          setIsLoading(false);
          return;
        }

        const response = await axiosInstance.get(`/show/mapping/${id}`);
        const data = response.data.data;

        if (data && Array.isArray(data.rows)) {
          setTheatres(data.rows);
        } else {
          setError("Unexpected data format");
          setTheatres([]);
        }

        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch theatre details");
        setIsLoading(false);
      }
    };

    fetchTheatres();
  }, [id]);

  const openModal = (timing, name, theatre) => {
    setSelectedTiming(timing);
    setModalIsOpen(true);
    setThreaterName(name);
    setSelectedThreater(theatre)
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTiming("");
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log(`Selected Timing: ${selectedTiming}, Seats: ${seats}`);
    closeModal();
  };

  const seatOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSeatClick = (number) => {
    setSeats(number);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // creating state for Link, because we cannot pass props directly in the Link.
  let data ={
    seats: seats,
    name: threaterName,
    timing:selectedTiming,
    theatres: selectedThreater
  }

  return (
    <>
      <h2>• Theatres and Timings: Find the Best Spot for Your Show!!</h2>
      <div className="theatre-box">
        {theatres.length > 0 ? (
          theatres.map((theatre) => (
            <div className="theatre-card" key={theatre.id}>
              <div className="theatre-info">
                <span className="theatre-name" >❤️ {theatre.theatre.name}</span>
                <span className="food">🍔+Food & Beverage</span>
                <div className="timings">
                  {Object.values(theatre.theatre.timings).map((timing, index) => (
                    <div
                      className="timing-box"
                      key={index}
                      onClick={() => openModal(timing, theatre.theatre.name, theatre)}
                    >
                      {timing}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5>😥 Oops!! No theatres available...</h5>
        )}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Booking Modal">
        <h2>Book Seats for {selectedTiming}</h2>
        <img src={img} id="img" alt="Image" />
        <form onSubmit={handleBookingSubmit}>
          <label>How Many seats?</label>
          <div className="seat-options">
            {seatOptions.map((option) => (
              <div
                key={option}
                className={`seat-option ${seats === option ? 'selected' : ''}`}
                onClick={() => handleSeatClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <br />
          <div className="button-container">
            <Link to="/seats"
          state={{ data }}>
              <button id="submit">Select seats</button>
            </Link>
            <button id="cancel" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default TheatreListing;
