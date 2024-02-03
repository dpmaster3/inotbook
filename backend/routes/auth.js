const express = require("express");
const { body, validationResult } = require("express-validator");
const Users = require("../models/Users.js");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Corrected jwt import
const getuser = require("../middleware/getuser.js");
// Create a User using: POST "/api/auth/createuser". no login required
//route 1 :Sing up
router.post(
  "/createuser",
  [
    body("name").notEmpty().escape(),
    body("email").isEmail().escape(),
    body("password").isStrongPassword().escape(),
  ],
  async (req, res) => {
    let success=false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtScreet = process.env.JWT_SECRET || "default_secret";
      const authtoken = jwt.sign(data, jwtScreet); // Corrected variable name
      success=true
      
      res.json({ success,authtoken }); // Respond with the token
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Internal server error occurred");
    }
  }
);

//route 2 :Login
router.post(
  "/login",
  [
    body("email").isEmail().escape(),
    body("password").isStrongPassword().escape(),
  ],
  async (req, res) => {
    let success=false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Enter Valid Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Enter Valid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtScreet = process.env.JWT_SECRET || "default_secret";
      const authtoken = jwt.sign(data, jwtScreet);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Internal server error occurred");
    }
  }
);
//route 3 : Get User Details
router.post("/getuser", getuser , async (req, res) => {
  try {
    const userID=req.user.id;
    const user = await Users.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some Internal server error occurred");
  }
});

module.exports = router;
