const express = require("express");
const router = express.Router();

const { createUser, getUser } = require("../controllers/index");
const middleware = require("../middleware/users");

router.post("/login", getUser.post);
router.post("/sign-up",  middleware.validateRegister, createUser.post);
router.get("/secrete-route", middleware.isLoggedIn, (req, res, next) => {
  res.send("This is the secret content. Only logged in users can see that!");
});

module.exports = router;
