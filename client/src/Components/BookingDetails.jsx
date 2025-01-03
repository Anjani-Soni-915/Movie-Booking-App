import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosInterceptor";

function BookingDetails() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axiosInstance.get("/bookingDetails/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;
        setBookingDetails(data);
      } catch (error) {
        setError("Failed to fetch booking details.");
      }
    };

    fetchBookingDetails();
  }, [token]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <h2>🔖 Booking History</h2>
      <div className="booking-box">
        {bookingDetails.length > 0 ? (
          <table>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>Customer Id</th>
                <th>Show Name</th>
                <th>Theatre Name</th>
                <th>Time</th>
                <th>Seat Number</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Payment Status</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails.map((data, index) => (
                <tr key={data.id}>
                  {/* <td>{index + 1}</td> */}
                  <td>{data.userId}</td>
                  <td>{data.show?.showName}</td>
                  <td>{data.theatre?.name}</td>
                  <td>{data.time}</td>
                  <td>{data.seatNumber}</td>
                  <td>₹{data.amount}</td>
                  <td>{data.paymentResponse?.payment_id}</td>
                  <td>{data.paymentResponse?.status}</td>
                  <td>{formatDate(data.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>{"No booking details found, Book your First show..."}</h2>
        )}
      </div>
    </div>
  );
}

export default BookingDetails;
