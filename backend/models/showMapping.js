const { Shows } = require(".");

module.exports = (sequelize, Sequelize) => {
  const ShowMapping = sequelize.define("showMapping", {
    showId: {
      type: Sequelize.INTEGER,
    },
    theatreId: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  ShowMapping.associate = function (models) {
    ShowMapping.belongsTo(models.Shows, {
      foreignKey: "showId",
      onDelete: "SET NULL",
      constraints: false,
    });
    ShowMapping.belongsTo(models.Theatre, {
      foreignKey: "theatreId",
      onDelete: "SET NULL",
      constraints: false,
    });
  };

  return ShowMapping;
};
