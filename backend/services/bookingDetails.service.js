const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { BookingDetails, Theatre, Shows } = require("../models");

const createBookingDetails = async (bookingDetailsBody, userId) => {
  try {
    const bookingDetails = await BookingDetails.create({
      ...bookingDetailsBody,
      userId,
    });
    const theatre = await Theatre.findByPk(bookingDetails.theatreId);
    const show = await Shows.findByPk(bookingDetails.showId);

    return {
      ...bookingDetails.toJSON(),
      theatreName: theatre ? theatre.name : "Unknown Theatre",
      showName: show ? show.showName : "Unknown Show",
    };
  } catch (error) {
    console.error("Error creating booking details:", error);
    throw error;
  }
};

const getBookingDetails = async () => {
  const data = await BookingDetails.findAndCountAll({
    where: { status: true },
    order: [["createdAt", "DESC"]],
    // include: [{ model: Shows }]
  });
  return data;
};

const getBookingDetailsById = async (id) => {
  try {
    const data = await BookingDetails.findOne({ where: { id: id } });
    return data;
  } catch (error) {
    console.error("Error retrieving BookingDetails by id:", error);
    throw error;
  }
};

const getBookingDetailsByUserId = async (id) => {
  try {
    const data = await BookingDetails.findAll({
      where: { userId: id },
      order: [["createdAt", "DESC"]],
      include: [{ model: Shows }, { model: Theatre }],
    });
    return data;
  } catch (error) {
    console.error("Error retrieving BookingDetails by id:", error);
    throw error;
  }
};

const updateBookingDetails = async (id, body) => {
  try {
    const BookingDetails = await BookingDetails.findByPk(id, { status: true });

    if (BookingDetails) {
      await BookingDetails.update(body);
      return BookingDetails;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating BookingDetails:", error);
    throw error;
  }
};

const deleteBookingDetailsById = async (id) => {
  try {
    const data = await BookingDetails.findOne({ where: id });

    if (!data) {
      throw new Error("BookingDetails not found");
    }
    data.status = 0;
    await data.save();

    console.log("BookingDetails deleted successfully");

    return { message: "BookingDetails deleted successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  createBookingDetails,
  getBookingDetails,
  getBookingDetailsByUserId,
  getBookingDetailsById,
  updateBookingDetails,
  deleteBookingDetailsById,
};
