module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.DATE,
    },
    phoneNumber: {
      type: Sequelize.BIGINT,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    googleId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Users;
};
