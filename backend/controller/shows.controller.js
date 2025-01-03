// const db = require("../config/db");
const db = require("../models/index");
const ShowsService = require("../services/shows.service");
const httpStatus = require("http-status");
const { Sequelize } = require("sequelize");
const Op = db.Sequelize.Op;

const createShow = async (req, res) => {
  let body = req.body;
  const data = await ShowsService.createShow(body);
  if (data) {
    await res.status(200).send({ message: "Show created successfully" });
  } else {
    await res.status(404).send({ message: "Show not created" });
  }
};
const getShow = async (req, res) => {
  const category = req.query.category;

  let condition = {};
  if (category) {
    condition.category = { [Op.like]: `%${category}%` };
  }

  try {
    const data = await ShowsService.getShow(condition);
    if (data && data.count > 0) {
      res
        .status(httpStatus.OK)
        .send({ message: "Show data fetched successfully", data: data });
    } else {
      res.status(httpStatus.NO_CONTENT).send({ message: "No shows found" });
    }
  } catch (error) {
    console.error("Error fetching shows:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "An error occurred", error: error.message });
  }
};

const getShowById = async (req, res) => {
  const id = req.params.id;
  const showId = parseInt(id, 10);

  if (isNaN(showId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const data = await ShowsService.getShowById(id);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "Show data fetched successfully", data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

// show and theatre Mapping 
const getShowAndTheatreById = async (req, res) => {
  const id = req.params.id;
  const showId = parseInt(id, 10);

  if (isNaN(showId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const data = await ShowsService.getShowAndTheatreById(id);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "Show data fetched successfully", data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

const updateShow = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = await ShowsService.updateShow(id, body);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "Show data updated Successfully", data: data });
  } else {
    res
      .status(httpStatus.NO_CONTENT)
      .send({ message: "Error in updating data" });
  }
  return data;
};

const getSearch = async (req, res) => {
  const query = req.query;
  const filters = Object.keys(query).length === 0 ? null : Object.keys(query)[0];
  try {
    const data = await ShowsService.searchShows(filters);
    if (data && data.count !== undefined) {
      if (data.count > 0) {
        res.status(httpStatus.OK).send({ message: "Shows found", data });
      } else {
        res.status(httpStatus.NO_CONTENT).send({ message: "No shows found" });
      }
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Unexpected data format" });
    }
  } catch (error) {
    console.error("Error searching shows:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Error searching shows", error: error.message });
  }
};

module.exports = {
  createShow,
  getShow,
  getShowById,
  getShowAndTheatreById,
  updateShow,
  getSearch,
};
