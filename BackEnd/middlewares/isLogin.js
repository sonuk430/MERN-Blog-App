const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLogin = (req, res, next) => {
  //   console.log(req.headers);

  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  //? Verify the token

  jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
    // console.log(decoded);
    const userId = decoded?.user?.id;

    const user = await User.findById(userId).select("username email role _id");

    // save user into req obj
    req.userAuth = user;

    if (error) {
      const err = new Error("Token expired/Invalid");
      next(err);
    } else {
      next();
    }
  });
};

module.exports = isLogin;
