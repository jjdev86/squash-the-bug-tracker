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
        msg: "Please enter a password with min. 6 chars",
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
};
