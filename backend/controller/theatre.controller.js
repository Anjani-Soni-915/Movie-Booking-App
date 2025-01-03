const TheatreService = require("../services/theatre.service");
const httpStatus = require("http-status");

//create Theatre
const createTheatre = async (req, res) => {
  let TheatreBody = req.body;
  const data = await TheatreService.createTheatre(TheatreBody);
  if (data) {
    await res.status(200).send({ message: "Theatre created successfully" });
  } else {
    await res.status(404).send({ message: "Theatre not created" });
  }
};

//get Theatres
const getTheatre = async (req, res) => {
  const data = await TheatreService.getTheatre();
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "Theatre data fetched successfully", data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

const getTheatreById = async (req, res) => {
  const id = req.params.id;
  const data = await TheatreService.getTheatreById(id);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "Theatre data fetched successfully", data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

const updateTheatre = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = await TheatreService.updateTheatre(id, body);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "Theatre data updated Successfully", data: data });
  } else {
    res
      .status(httpStatus.NO_CONTENT)
      .send({ message: "Error in updating data" });
  }
  return data;
};

const deleteTheatre = async (req, res) => {
  const id = req.params;
  const deleteTheatre = await TheatreService.deleteTheatreById(id);
  if (deleteTheatre) {
    res.status(httpStatus.OK).send({ message: "Theatre deleted successfully" });
  } else {
    res
      .status(httpStatus.NO_CONTENT)
      .send({ message: "Error in Theatre delete" });
  }
};

module.exports = {
  createTheatre,
  getTheatre,
  getTheatreById,
  updateTheatre,
  deleteTheatre,
};
