import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../Models/UserModel.js";

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new User(req.body);
  const { username } = req.body;
  try {
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "username is already registered!" });
    }
    let user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "9h" }
    );
    const { password, isAdmin, createdAt, updatedAt, ...otherDetails } =
      user._doc;
    res.status(200).json({ user: otherDetails, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json("Wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        const { password, isAdmin, createdAt, updatedAt, ...otherDetails } =
          user._doc;
        res.status(200).json({ user: otherDetails, token });
      }
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    let users = await User.find({});

    users = users.map((user) => {
      const { password, isAdmin, createdAt, updatedAt, ...otherDetails } =
        user._doc;
      return otherDetails;
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    let user = await User.findById(id);
    console.log(user);
    if (user) {
      const { password, isAdmin, createdAt, updatedAt, ...otherDetails } =
        user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No Such User");
    }
  } catch (error) {}
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id || currentUserAdmin) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // have to change this
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      // console.log({ user, token });
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId === id || currentUserAdmin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("Deleted User Successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};
export { registerUser, loginUser, getUsers, getUser, updateUser, deleteUser };
