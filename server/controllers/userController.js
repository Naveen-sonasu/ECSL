import User from "../models/users.js";
import generateToken from "../utils/generateToken.js";

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("centre");

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        centreId: user.centre._id,
        centre: user.centre.name,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, centreName, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      centreName,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        centre: user.centre,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id).populate("centre");

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      centre: user.centre,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const getUsers = async (req, res) => {
  const user = await User.find().populate("centre", "name").select("-password");
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not Found" });
  }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.centre = req.body.centre || user.centre;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      centre: user.centre,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const searchUsers = async (req, res) => {
  const { userName } = req.body;
  const user = await User.find({ name: new RegExp(".*" + userName + ".*") })
    .populate("centre")
    .select("-password");

  res.json(
    user
    // _id: user._id,
    // name: user.name,
    // email: user.email,
    // centre: user.centre,
  );
};
