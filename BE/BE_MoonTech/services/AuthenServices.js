require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const registerUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json("Email already exist!");
      return null;
    }

    const result = await Users.create({
      email: req.body.email,
      password: hashPassword,
      phone: req.body.phone,
      admin: req.body.admin,
    });

    if (!result) {
      res.status(400).json("Register fail!");
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const foundUser = await Users.findOne({ email: req.body.email });

    if (foundUser) {
      const correctPass = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );
      if (!correctPass) {
        res.status(401).json("Incorrect password!");
        return null;
      } else {
        const token = jwt.sign(foundUser, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({ accessToken: token });
      }
    } else {
      res.status(401).json("No email found!");
      return null;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
