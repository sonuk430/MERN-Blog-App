const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generateToken");

// @Desc Register a new user
//@route POST /api/v1/users/register
//@access public

exports.register = asyncHandler(async (req, res) => {
  // get the details
  const { username, email, password } = req.body;

  //! Check if user exist
  const user = await User.findOne({ username });
  if (user) {
    throw new Error("User Already Exists");
  }

  // Register New user
  const newUser = new User({
    username,
    email,
    password,
  });

  //! hash password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  // Save
  await newUser.save();
  res.status(201).json({
    status: "success",
    message: "User Register Successfully",
    // _id: newUser?._id,
    // username: newUser?.username,
    // email: newUser?.email,
    // role: newUser?.role,
    newUser,
  });
});

// @Desc Login user
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler(async (req, res) => {
  //? get the login details
  const { username, password } = req.body;

  //! check if user exists
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  // compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user?.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }

  // Update the last login
  user.lastLogin = new Date();
  res.json({
    status: "success",
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user),
  });
});

// @Desc Get profile
//@route POST /api/v1/users/profile/:id
//@access Private

exports.getProfile = asyncHandler(async (req, res, next) => {
  //! get user is from params
  const id = req.userAuth._id;
  const user = await User.findById(id);
  // console.log(user);
  res.json({
    status: "success",
    message: "Profile fetched",
    user,
  });
});
