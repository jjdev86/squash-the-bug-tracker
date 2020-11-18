const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { hash, salt } = require("./mysql/Authusers");
const pool = require("./model/mysql");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");


if (dotenv.error) {
  throw dotenv.error;
}

sgMail.setApiKey(process.env.apiKey2);

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set jwtTokenSecret
app.set("jwtSecretToken", process.env.JWT_SECRET_TOKEN);

// parse application/json
app.use(bodyParser.json());
app.use(morgan("dev"));
// routes
const router = require('./routes/router.js');
app.use(express.static("public"));
app.use(express.static(path.join(__dirname + "/public/dist")));
// allows React to handle routes


app.get('/hey', (req, res) => res.send("ho!"));
app.use('/api', router);


// app.post("/login", async (req, res) => {
//   // get user login info from headers
//   let authorization = req.headers.authorization.split(" ")[1];
//   authorization = Buffer.from(authorization.toString(), "base64")
//     .toString("ascii")
//     .split(":");
//   let email = authorization[0];
//   let pass = authorization[1];

//   // query DB to check if email exists
//   try {
//     let query = `SELECT * FROM users WHERE email = "${email}"`;
//     const result = await pool.query(query);

//     if (!result.length) {
//       res.status(409).send({ error: "The email entered was not found." });
//     } else {
//       // compare the user provided pass with hash stored in db
//       let salt = result[0].salt;

//       if (result[0].hash === hash(`${salt}${pass}`)) {
//         var user = { id: result[0].id, email: email };

//         jwt.sign(
//           { user },
//           process.env.JWT_SECRET_TOKEN,
//           { expiresIn: "30m" },
//           (err, token) => {
//             if (err) {
//               throw err;
//             }
//             res.status(200).send({
//               user: { id: user.id, email: user.email },
//               token,
//             });
//           }
//         );
//       } else {
//         res.status(409).send({ error: "The password entered does not match." });
//       }
//     }
//   } catch (err) {
//     console.log(err, `error`);
//     res.status(500).send(err);
//     throw err;
//   }
// });

// app.post("/createNewUser", async (req, res) => {
//   console.log(req.body, `body`);
//   // generate salt with CSPRNG
//   const aSalt = salt();
//   let pass = req.body.password;
//   // Prepend the salt to the user password and hash it
//   pass = hash(`${aSalt}${pass}`);

//   try {
//     // check whether user already exists
//     const user = await pool.query(
//       `SELECT 1 FROM users WHERE EXISTS (SELECT 1 FROM users WHERE email = "${req.body.email}") ORDER BY email LIMIT 1 `
//     );
//     if (user.length) {
//       let error = {
//         message: "The email address already exists",
//       };
//       // email already exists return 409
//       res.status(409).send(error);
//     } else {
//       // insert new user email, hashed pass, and sal
//       const response = await pool.query(
//         `INSERT INTO users (email, hash, salt) VALUES ("${req.body.email}","${pass}","${aSalt}")`
//       );
//       const id = response.insertId;
//       let user = {
//         id: response.insertId,
//         email: req.body.email,
//       };
//       // respond to client with sucessful account creation and jwt token
//       jwt.sign(
//         { user },
//         process.env.JWT_SECRET_TOKEN,
//         { expiresIn: "30m" },
//         (err, token) => {
//           if (err) {
//             console.log(err);
//           }
//           console.log(token, `token sent to web`);
//           res.status(200).send({
//             id: id,
//             sucess: true,

//             user: user,
//             accessToken: token,
//           });
//         }
//       );
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get('/auto_login', verifyToken, (req, res) => {
//   jwt.verify()

// });

// app.post("/resetpassword", (req, res) => {
//   const { email } = req.body;

//   const message = {
//     to: email,
//     from: "test@gmail.com",
//     subject: "Password Reset Request",
//     text:
//       "This is a test email and we want to reset the password from HVAC Incentive Porta",
//     html: `<h1>This message was sent because you requested a password.</h1> Click here`,
//     template: "d-e64f1116ed1f41aaa7fbc9f973f0d2bc",
//   };

//   sgMail
//     .send(message)
//     .then(() => {
//       console.log("Email sent");
//       res.status(200).send({});
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/dist/index.html"));
// });

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
