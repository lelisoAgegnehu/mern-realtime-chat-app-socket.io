import bcrypt from "bcrypt";
import User from "../model/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    console.log({ email: email, password: password });
    const usernameCheck = await User.findOne({ userName });
    if (usernameCheck) {
      res.status(403).json({ msg: "User Name already exists !" });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      res.status(403).json({ msg: "Email already exists !" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName: userName,
      email: email,
      password: hashpassword,
    });

    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(403).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(403).json({ msg: "Invalid credentials" });
    }
    delete user.password;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const { image } = req.body;
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage: image,
    });

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "userName",
      "avatarImage",
      "_id",
    ]);
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
