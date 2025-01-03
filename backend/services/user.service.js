const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

const createUser = async (_userBody) => {
  try {
    const { email, password, ...rest } = _userBody;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use, try another email...");
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const createdUser = await Users.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return { user: createdUser, token };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw new Error("Oops! Invalid email or password, try again...");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Oops! Invalid email or password, try again...");
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    return { user, token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const googleLoginUser = async (googleUser) => {
  const { email, displayName, uid } = googleUser;

  if (!uid) {
    throw new Error("Google ID (uid) is missing from the Google user object.");
  }
  if (!email) {
    throw new Error("Email is missing from the Google user object.");
  }

  let user = await Users.findOne({ where: { googleId: uid } });

  if (!user) {
    user = await Users.findOne({ where: { email: email } });
  }

  if (!user) {
    user = await Users.create({
      name: displayName || "google User",
      email: email,
      googleId: uid,
    });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  return { user, token };
};

const getUser = async () => {
  const data = await Users.findAndCountAll({ where: { status: true } });
  return data;
};

const getUserById = async (id) => {
  try {
    const data = await Users.findOne({ where: { id: id } });
    return data;
  } catch (error) {
    console.error("Error retrieving user by id:", error);
    throw error;
  }
};

const updateUser = async (id, body) => {
  try {
    const user = await Users.findByPk(id);

    if (user) {
      await user.update(body);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const user = await Users.findOne({ where: id });

    if (!user) {
      throw new Error("User not found");
    }
    user.status = 0;
    await user.save();

    console.log("User deleted successfully");

    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  createUser,
  loginUser,
  googleLoginUser,
  getUser,
  getUserById,
  updateUser,
  deleteUserById,
};
