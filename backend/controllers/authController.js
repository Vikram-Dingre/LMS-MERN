import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req, res) => {
  const { userName, userEmail, password } = req.body;
  const isExists = await User.findOne(req.body);
  if (isExists) {
    return res
      .status(404)
      .json({ success: false, message: "user already exists." });
  }

  try {
    const newUser = await new User({ userName, userEmail, password });
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "user signUp successfully." });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error while sign-up user." });
  }
};

const login = async (req, res) => {
  const { userEmail, password } = req.body;

  const user = await User.findOne({ userEmail });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user not exists. please sign-up." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(404)
      .json({ success: false, message: "incorrect userName or Password." });
  }

  const token = jwt.sign({ ...user }, process.env.JWT_SECRET_KEY);

  return res.status(200).json({
    success: true,
    message: "user logged-in successfully.",
    user,
    token,
  });
};

export { login, signup };
