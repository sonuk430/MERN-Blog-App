const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLogin = (req, res, next) => {
  //   console.log(req.headers);

  // Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  //? Verify the token

  jwt.verify(token, "anykey", async (error, decoded) => {
    // console.log(decoded);
    const userId = decoded?.user?.id;

    const user = await User.findById(userId).select("username email role _id");

    // save user into req obj
    req.userAuth = user;

    if (error) {
      return "Invalid token";
    } else {
      //! save the user
      //* send the user
      next();
    }
  });
};

module.exports = isLogin;
