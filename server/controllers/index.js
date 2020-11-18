const db = require("../model/mysql");
const lib = require("../lib/hashUtils");
const jwt = require("jsonwebtoken");
const { send } = require("@sendgrid/mail");

module.exports = {
  createUser: {
    post: (req, res) => {
      // check if email already exists in db
      //   db.isExistingUser(req.body.email, (err, result) => {
      //     if (err) {
      //       res.status(409).send({
      //         msg: "This email address was already used!",
      //       });
      //     }
      //     // create user
      //     const salt = lib.salt();
      //     // Prepend the salt to the user password and hash it
      //     const hash = lib.hash(`${salt}${req.body.password}`);

      //     req.body.hash = hash;
      //     req.body.salt = salt;

      //     // email, hash, salt
      //     db.createUser(req.body, (err, result) => {
      //       if (err) {
      //         res.status(500).send({ msg: err });
      //       }
      //       res.status(201).send({
      //         msg: "Registered",
      //         result: result,
      //       });
      //     });
      //   });

      db.isExistingUser(req.body.email)
        .then((result) => {
          console.log(result, `results from db`);
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
              .then(result => {

                res.status(201).send({
                  msg: "Registered",
                  result: result,
                });
              })
              .catch(err => {
                  console.log(err, `error in insert`)
                res.status(500).send({ msg: 'error', err: err });
              });
          }


        })
        .catch((err) => {
          res.status(409).send({
            msg: "This email address was already used!",
            err: err,
          });
        });
    },
  },

  getUser: {
    post: (req, res) => {},
  },
};
