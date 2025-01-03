const userService = require("../services/user.service");
const httpStatus = require("http-status");

//create user
const createUser = async (req, res) => {
  try {
    const userBody = req.body;
    const { user, token } = await userService.createUser(userBody);
    res
      .status(httpStatus.CREATED)
      .send({ message: "User created successfully", data: user, token });
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Error creating user", error: error.message });
  }
};

// Login users
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    const { user, token } = await userService.loginUser(email, password);
    res.status(httpStatus.OK).json({
      message: "Login successful",
      data: user,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  }
};

// Google Login
const googleLogin = async (req, res) => {
  try {
    const { email, displayName, uid } = req.body;

    if (!uid) {
      throw new Error("Google ID (uid) is missing from the request body.");
    }
    if (!email) {
      throw new Error("Email is missing from the request body.");
    }

    const { user, token } = await userService.googleLoginUser({
      email,
      displayName,
      uid,
    });
    res
      .status(httpStatus.OK)
      .send({ message: "Google login successful", data: user, token: token });
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Google login failed", error: error.message });
  }
};

//get users
const getUsers = async (req, res) => {
  const data = await userService.getUser();
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "user data fetched successfully", data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

// get user by id
const getUserById = async (req, res) => {
  const id = req.params.id;
  const data = await userService.getUserById(id);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "user data fetched successfully", data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in fetch data" });
  }
  return data;
};

// update user
const updateUser = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = await userService.updateUser(id, body);
  if (data) {
    res
      .status(httpStatus.OK)
      .send({ message: "User data updated Successfully", data: data });
  } else {
    res
      .status(httpStatus.NO_CONTENT)
      .send({ message: "Error in updating data" });
  }
  return data;
};

//delete user
const deleteUser = async (req, res) => {
  const id = req.params;
  const deleteUser = await userService.deleteUserById(id);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: "user deleted successfully" });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: "Error in User delete" });
  }
};

module.exports = {
  createUser,
  loginUser,
  googleLogin,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
