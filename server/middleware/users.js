const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = {
  // vaidate email
  validateRegister: (req, res, next) => {
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        msg: "Please enter a username with min. 3 chars",
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 5) {
      return res.status(400).send({
        msg: "Please enter a password with min. 5 chars",
      });
    }

    // password (confirmation pass) does not match
    if (!req.body.confirmpwd || req.body.password !== req.body.confirmpwd) {
      return res.status(400).send({
        msg: "Both passwords must match",
      });
    }
    next();
  },
  validateLogin: (req, res, next) => {
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        msg: "Please enter a valid email address",
      });
    }

    if (!req.body.password || req.body.password.length < 5) {
      return res.status(400).send({
        msg: "Please enter a password with min. 5 chars",
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ");
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
};
