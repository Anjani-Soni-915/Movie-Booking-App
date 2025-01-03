module.exports = (sequelize, Sequelize) => {
  const Theatre = sequelize.define("theatre", {
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.JSONB,
    },
    timings: {
      type: Sequelize.JSONB,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  Theatre.associate = function (models) {
    Theatre.hasMany(models.Shows, {
      foreignKey: "theaterId",
      onDelete: "SET NULL",
      constraints: false,
    });
    Theatre.hasMany(models.ShowMapping, {
      foreignKey: "theatreId",
      onDelete: "SET NULL",
      constraints: false,
    });
    Theatre.hasMany(models.BookingDetails, {
      foreignKey: "theatreId",
      onDelete: "SET NULL",
      constraints: false,
    });
  };

  return Theatre;
};
