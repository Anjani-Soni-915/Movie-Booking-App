import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RazorpayModal from "./Razorpay";

function Seats() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState({
    Silver: [],
    Gold: [],
    Diamond: [],
  });
  const [price] = useState({
    Gold: 300,
    Silver: 200,
    Diamond: 400,
  });

  const sections = {
    Silver: [
      ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
      ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
    ],
    Gold: [
      ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"],
      ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12"],
    ],
    Diamond: [
      ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12"],
      ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
      ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12", "G13", "G14"],
    ],
  };

  const [maxSeats, setMaxSeats] = useState(1);
  const [showRazorpay, setShowRazorpay] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = location.state;
    const seats = queryParams?.data?.seats;

    if (seats) {
      setMaxSeats(seats);
    }
  }, [location.state]);


  const { seats, name, timing, theatres } = location.state?.data || {};


  useEffect(() => {
    if (!location.state || !location.state.data) {
      console.error("location.state or location.state.data is undefined");
      return;
    }

  const { showId, theatreId } = location.state.data.theatres;
    if (!showId || !theatreId) {
      console.error("showId or theatreId is undefined or null");
      return;
    }

    const fetchReservedSeats = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/bookingDetails`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        if (result && result.data && Array.isArray(result.data.rows)) {
          const updatedReservedSeats = { Silver: [], Gold: [], Diamond: [] };

          result.data.rows.forEach((booking) => {
            const { showId: bookedShowId, theatreId: bookedTheatreId, seatNumber } = booking;

            if (bookedTheatreId === theatreId && bookedShowId === showId) {
  
              const bookedSeats = seatNumber.split(",");

              bookedSeats.forEach((seat) => {
                for (const tier in sections) {
                  const allSeats = sections[tier].flat();
                  if (allSeats.includes(seat.trim())) {
                    if (!updatedReservedSeats[tier].includes(seat.trim())) {
                      updatedReservedSeats[tier].push(seat.trim());
                    }
                  }
                }
              });
            }
          });
          setReservedSeats(updatedReservedSeats);
        } else {
          console.error("Invalid data format:", result);
        }
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      }
    };

    fetchReservedSeats();
  }, [location.state]);

  const toggleSeat = (seat, tier) => {
    if (reservedSeats[tier].includes(seat)) {
      alert("This seat is reserved!");
      return;
    }

    if (selectedSeats.length >= maxSeats && !selectedSeats.find((s) => s.seat === seat)) {
      alert("Max seats reached. Deselect one to add more.");
      return;
    }

    setSelectedSeats((prevSelected) =>
      prevSelected.find((s) => s.seat === seat && s.tier === tier)
        ? prevSelected.filter((s) => s.seat !== seat)
        : [...prevSelected, { seat, tier }]
    );
  };

  const handleContinue = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to continue.");
      return;
    }
    setShowRazorpay(true);
  };

  const renderSection = (tier) => (
    <div className="section" key={tier}>
      <h6>{tier} Seating - ₹{price[tier]}</h6>
      <div className="seat-rows">
        {sections[tier].map((row, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {row.map((seat) => {
              const isSelected = selectedSeats.find((s) => s.seat === seat && s.tier === tier);
              const isReserved = reservedSeats[tier].includes(seat);
              return (
                <div
                  key={seat}
                  className={`seat ${isSelected ? "selected" : ""} ${isReserved ? "reserved" : ""}`}
                  onClick={() => toggleSeat(seat, tier)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="seats">
      <h2>{name}, At {timing}</h2>
      <div className="screens">
        <img id="screen" src="https://s.alicdn.com/@sc04/kf/H17dd1466168f4fe3bb67cbb222b16b4bN.jpg_300x300.jpg" alt="Screen"/>
      </div>

      {Object.keys(sections).map(tier => renderSection(tier))}

      {selectedSeats.length > 0 && (
        <>
          <div className="seat-price">
            <div className="seat-select">
              <h4 className="seats-select">
                SEAT: {selectedSeats.map(s => `${s.seat}`).join(", ")}
              </h4>
            </div>
            <div className="totalprice">
              <h4 className="price">
                Price: ₹{selectedSeats.reduce((total, s) => total + price[s.tier], 0)}
              </h4>
            </div>
          </div>
          <button className="continue" onClick={handleContinue}>
            Continue
          </button>
        </>
      )}

      {showRazorpay && (
        <RazorpayModal
          totalPrice={selectedSeats.reduce((total, s) => total + price[s.tier], 0)}
          selectedSeats={selectedSeats.map(s => `${s.seat}`).join(", ")}
          showId={location.state.data.theatres.showId}
          theatreId={location.state.data.theatres.theatreId}
          timing={location.state.data.timing}
          onClose={() => setShowRazorpay(false)}
        />
      )}
    </div>
  );
}

export default Seats;
