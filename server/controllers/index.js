const db = require("../model/mysql");
const lib = require("../lib/hashUtils");
const jwt = require("jsonwebtoken");
const { send } = require("@sendgrid/mail");

module.exports = {
  createUser: {
    post: (req, res) => {
      db.isExistingUser(req.body.email)
        .then((result) => {
          if (result.length) {
            return res
              .status(409)
              .send({ msg: "This email address already exists!" });
          } else {
            const salt = lib.salt();
            // Prepend the salt to the user password and hash it
            const hash = lib.hash(`${salt}${req.body.password}`);

            req.body.hash = hash;
            req.body.salt = salt;

            // insert user to db
            db.createUser(req.body)
              .then((result) => {
                res.status(201).send({
                  msg: "Registered",
                  result: result,
                });
              })
              .catch((err) => {
                console.log(err, `error in insert`);
                res.status(500).send({ msg: "error", err: err });
              });
          }
        })
        .catch((err) => {
          res.status(409).send({
            msg: "Error with query to find user",
            err: err,
          });
        });
    },
  },

  getUser: {
    post: (req, res) => {
      // user exhist and we need to compare hash with password provided.
      db.getUser(req.body.email)
        .then((result) => {
          if (!result.length) {
            // email not found in DB
            res.status(409).send({
              msg: "Email address not found.",
            });
          } else {
            let salt = result[0].salt;

            if (result[0].hash === lib.hash(`${salt}${req.body.password}`)) {
              var user = { id: result[0].id, email: req.body.email };
              jwt.sign(
                { user },
                process.env.JWT_SECRET_TOKEN,
                { expiresIn: "30m" },
                (err, token) => {
                  if (err) {
                    res.status(500).send({
                      msg: "error in jwt sign",
                      err: err,
                    });
                  }

                  res.status(200).send({
                    user: { id: user.id, email: user.email },
                    token,
                  });
                }
              );
            } else {
              res.status(409).send({
                msg: "The email or password is incorrect",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err, `error`);
          res.status(409).send({
            msg: "This email does not exists",
            err: err,
          });
        });
    },
  },
};
