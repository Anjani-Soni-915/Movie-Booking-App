const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { Shows, Theatre, ShowMapping } = require("../models");
const db = require("../models/index");
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");

const createShow = async (body) => {
  try {
    const bodyData = {
      ...body,
      theaterId: 1,
    };
    const data = await Shows.create(bodyData);
    body?.theaterId?.map(async (theaterId) => {
      body = {
        showId: data.id,
        theatreId: theaterId.id,
      };
      return await ShowMapping.create(body);
    });
    return data;
  } catch (error) {
    console.error("Error creating Show:", error);
    throw error;
  }
};

const getShow = async (condition) => {
  try {
    const data = await db.Shows.findAndCountAll({
      where: {
        status: true,
        ...condition,
      },
      // include: [{ model: Shows }]
    });
    return data;
  } catch (error) {
    console.error("Sequelize Error:", error);
    throw new Error("Error fetching shows");
  }
};

const getShowById = async (id) => {
  try {
    const data = await Shows.findOne({ where: { id: id } });
    return data;
  } catch (error) {
    console.error("Error retrieving Show by id:", error);
    throw error;
  }
};

// ------------Mapping------------
const getShowAndTheatreById = async (id) => {
  try {
    const data = await ShowMapping.findAndCountAll({
      where: { showId: id },
      include: [
        {
          // where: { id: id },
          model: Shows,
          attributes: [
            "showName",
            "showType",
            "description",
            "image",
            "cast",
            "crew",
            "language",
            "likes",
            "category",
            "duration",
            "timings",
          ],
        },
        {
          model: Theatre,
          attributes: ["name", "address", "price", "timings"],
        },
      ],
    });
    return data;
  } catch (error) {
    console.error("Error retrieving Show by id:", error);
    throw error;
  }
};

const updateShow = async (id, body) => {
  try {
    const user = await Shows.findByPk(id);

    if (user) {
      await user.update(body);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating Show:", error);
    throw error;
  }
};
const searchShows = async (filterValue) => {
  let condition = { status: true };

  if (filterValue) {
    const dynamicConditions = [
      { showName: { [Op.iLike]: `%${filterValue}%` } },
      { category: { [Op.iLike]: `%${filterValue}%` } },
    ];
    const jsonbFields = {
      showType: ["type1", "type2", "type3"],
    };

    Object.keys(jsonbFields).forEach((jsonbField) => {
      jsonbFields[jsonbField].forEach((key) => {
        dynamicConditions.push(
          Sequelize.where(Sequelize.literal(`"${jsonbField}"->>'${key}'`), {
            [Op.iLike]: `%${filterValue}%`,
          })
        );
      });
    });

    condition = {
      [Op.or]: dynamicConditions,
    };
  }

  try {
    const result = await Shows.findAndCountAll({ where: condition });
    return result;
  } catch (error) {
    throw new Error(`Error searching shows: ${error.message}`);
  }
};

module.exports = {
  createShow,
  getShow,
  getShowById,
  getShowAndTheatreById,
  updateShow,
  searchShows,
};
