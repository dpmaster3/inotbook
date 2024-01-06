const jwt = require("jsonwebtoken");
const jwtScreet = process.env.JWT_SECRET || "default_secret";
const getuser = (req, res, next) => {
  //Get the user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate valid token" });
  }
  try {
    const data = jwt.verify(token, jwtScreet);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate valid token" });
  }
};
module.exports = getuser;
