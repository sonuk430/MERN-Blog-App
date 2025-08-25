const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // create payload for the User
  const payload = {
    user: {
      id: user.id,
    },
  };

  // sign the token with a secret key
  const token = jwt.sign(payload, "anykey", {
    expiresIn: 36000, // expire 1hr
  });
  return token;
};

module.exports = generateToken;
