module.exports = (sequelize, Sequelize) => {
  const Shows = sequelize.define("shows", {
    theaterId: {
      type: Sequelize.INTEGER,
    },
    showName: {
      type: Sequelize.STRING,
    },
    showType: {
      type: Sequelize.JSONB,
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.JSONB,
    },
    cast: {
      type: Sequelize.JSONB,
    },
    crew: {
      type: Sequelize.JSONB,
    },
    language: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.STRING,
    },
    timings: {
      type: Sequelize.JSONB,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  Shows.associate = function (models) {
    Shows.hasMany(models.ShowMapping, {
      foreignKey: "showId",
      onDelete: "SET NULL",
      constraints: false,
    });
    Shows.belongsTo(models.Theatre, {
      foreignKey: "theaterId",
      onDelete: "SET NULL",
      constraints: false,
    });
    Shows.hasMany(models.BookingDetails, {
      foreignKey: "showId",
      onDelete: "SET NULL",
      constraints: false,
    });
  };

  return Shows;
};
