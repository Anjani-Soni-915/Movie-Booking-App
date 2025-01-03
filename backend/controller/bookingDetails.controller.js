const bookingDetailsServices = require("../services/bookingDetails.service");
const userServices = require("../services/user.service");
const sendMail = require("../services/nodemailer.service");
const httpStatus = require("http-status");

//create BookingDetails
const createBookingDetails = async (req, res) => {
  const userId = req.user.userId;
  const BookingDetailsBody = req.body;

  try {
    const bookingData = await bookingDetailsServices.createBookingDetails(
      BookingDetailsBody,
      userId
    );

    if (bookingData) {
      const user = await userServices.getUserById(userId);

      if (user && user.email) {
        const bookingDetails = [
          {
            email: user.email,
            userName: user.name,
            movieName: bookingData.showName,
            theatreName: bookingData.theatreName,
            seatNumber: bookingData.seatNumber,
            time: bookingData.time,
          },
        ];

        await sendMail(bookingDetails);
      }

      res.status(200).send({ message: "BookingDetails created successfully" });
    } else {
      res.status(404).send({ message: "BookingDetails not created" });
    }
  } catch (error) {
    console.error("Error creating booking details:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

//get BookingDetailss
const getBookingDetails = async (req, res) => {
  const data = await bookingDetailsServices.getBookingDetails();
  if (data) {
    res
      .status(httpStatus.OK)
      .send({
        message: "BookingDetails data fetched successfully",
        data: data,
      });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};
const getBookingDetailsForUser = async (req, res) => {
  const id = req.user.userId;
  const data = await bookingDetailsServices.getBookingDetailsByUserId(id);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({
        message: "BookingDetails data fetched successfully",
        data: data,
      });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

const getBookingDetailsById = async (req, res) => {
  const id = req.params.id;
  const data = await bookingDetailsServices.getBookingDetailsById(id);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({
        message: "BookingDetails data fetched successfully",
        data: data,
      });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

const updateBookingDetails = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = await bookingDetailsServices.updateBookingDetails(id, body);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({
        message: "BookingDetails data updated Successfully",
        data: data,
      });
  } else {
    res
      .status(httpStatus.NO_CONTENT)
      .send({ message: "Error in updating data" });
  }
  return data;
};

const deleteBookingDetails = async (req, res) => {
  const id = req.params;
  const deleteBookingDetails =
    await bookingDetailsServices.deleteBookingDetailsById(id);
  if (deleteBookingDetails) {
    res
      .status(httpStatus.OK)
      .send({ message: "BookingDetails deleted successfully" });
  } else {
    res
      .status(httpStatus.NO_CONTENT)
      .send({ message: "Error in BookingDetails delete" });
  }
};

module.exports = {
  createBookingDetails,
  getBookingDetails,
  getBookingDetailsForUser,
  getBookingDetailsById,
  updateBookingDetails,
  deleteBookingDetails,
};
