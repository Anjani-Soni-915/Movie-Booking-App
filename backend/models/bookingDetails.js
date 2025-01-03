module.exports = (sequelize, Sequelize) => {
  const BookingDetails = sequelize.define("bookingDetails", {
    userId: {
      type: Sequelize.INTEGER,
    },
    showId: {
      type: Sequelize.INTEGER,
    },
    theatreId: {
      type: Sequelize.INTEGER,
    },
    time: {
      type: Sequelize.STRING,
    },
    seatNumber: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    paymentResponse: {
      type: Sequelize.JSONB,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  BookingDetails.associate = function (models) {
    BookingDetails.belongsTo(models.Shows, {
      foreignKey: "showId",
      onDelete: "SET NULL",
      constraints: false,
    });
    BookingDetails.belongsTo(models.Theatre, {
      foreignKey: "theatreId",
      onDelete: "SET NULL",
      constraints: false,
    });
  };

  return BookingDetails;
};
