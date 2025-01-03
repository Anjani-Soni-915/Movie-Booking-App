const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Users = require("./users.js")(sequelize, Sequelize);
db.Shows = require("./shows.js")(sequelize, Sequelize);
db.Theatre = require("./theatre.js")(sequelize, Sequelize);
db.ShowMapping = require("./showMapping.js")(sequelize, Sequelize);
db.BookingDetails = require("./bookingDetails.js")(sequelize, Sequelize);

// Initialize model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
