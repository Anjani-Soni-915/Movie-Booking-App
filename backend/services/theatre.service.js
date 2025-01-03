const { Theatre, Shows } = require("../models");

const createTheatre = async (_TheatreBody) => {
  try {
    const TheatreBody = _TheatreBody;
    const createdTheatre = await Theatre.create(TheatreBody);

    return createdTheatre;
  } catch (error) {
    console.error("Error creating Theatre:", error);
    throw error;
  }
};

const getTheatre = async () => {
  const data = await Theatre.findAndCountAll({
    where: { status: true },
    // include: [{ model: Shows }]
  });
  return data;
};

const getTheatreById = async (id) => {
  try {
    const data = await Theatre.findOne({ where: { id: id } });
    return data;
  } catch (error) {
    console.error("Error retrieving Theatre by id:", error);
    throw error;
  }
};

const updateTheatre = async (id, body) => {
  try {
    const Theatre = await Theatre.findByPk(id);

    if (Theatre) {
      await Theatre.update(body);
      return Theatre;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating Theatre:", error);
    throw error;
  }
};

const deleteTheatreById = async (id) => {
  try {
    const Theatre = await Theatre.findOne({ where: id });

    if (!Theatre) {
      throw new Error("Theatre not found");
    }
    Theatre.status = 0;
    await Theatre.save();

    console.log("Theatre deleted successfully");

    return { message: "Theatre deleted successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  createTheatre,
  getTheatre,
  getTheatreById,
  updateTheatre,
  deleteTheatreById,
};
