import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RazorpayModal = ({
  totalPrice,
  selectedSeats,
  showId,
  theatreId,
  timing,
  onClose,
}) => {
  const [razorpayInstance, setRazorpayInstance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const token = localStorage.getItem("token");

    const initializeRazorpay = async () => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Failed to load Razorpay SDK. Please try again.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/razorpay",
          { amount: totalPrice * 100 }
        );

        const options = {
          key: "rzp_test_yZobVDNvJEKGqn",
          currency: response.data.currency,
          amount: response.data.amount.toString(),
          order_id: response.data.id,
          name: "Movie Booking",
          description: "Payment for movie tickets",
          image: "http://localhost:1338/logo.svg",
          handler: async function (response) {
            if (response.razorpay_payment_id && response.razorpay_order_id) {
              alert("Payment successful");

              const bookingDetails = {
                showId,
                theatreId,
                time: timing,
                seatNumber: selectedSeats,
                amount: totalPrice,
                paymentResponse: {
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  status: "paid",
                },
              };

              try {
                await axios.post(
                  `http://localhost:3000/api/bookingDetails`,
                  bookingDetails,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                navigate(`/bookingDetails`);
              } catch (error) {
                alert("Failed to store booking details. Please try again.");
              }
            } else {
              alert("Payment failed. Please try again.");
            }
            onClose();
          },
          prefill: {
            name: userData.name || "Customer Name",
            email: userData.email || "customer@example.com",
            contact: userData.contact || "",
          },
        };

        const rzp = new window.Razorpay(options);
        setRazorpayInstance(rzp);
      } catch (error) {
        alert("Failed to initialize Razorpay. Please try again.");
      }
    };

    initializeRazorpay();
  }, [totalPrice, selectedSeats, showId, theatreId, timing, onClose, navigate]);

  // const checkLogin = () => {
  //   const storedUser = localStorage.getItem('user');

  //   if (!storedUser) {
  //     alert("Please Signup/Login first to proceed with the payment.");
  //     return;
  //   }

  //   if (razorpayInstance) {
  //     razorpayInstance.open();
  //   }
  // };

  const open = () => {
    razorpayInstance.open();
  };

  return (
    <div className="razorpay-modal">
      <div className="modal-content-pay">
        <h2>Pay Now</h2>
        <p>Total Amount: ₹{totalPrice}</p>
        <p>Seats: {selectedSeats}</p>
        <div className="btn">
          <button id="pay" onClick={open}>
            Pay ₹{totalPrice}
          </button>
          <button id="cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RazorpayModal;
