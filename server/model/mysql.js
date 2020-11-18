const { response } = require("express");
const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "GAD_users",
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database as too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});
// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySQL');
// });
pool.query = util.promisify(pool.query);

const isExistingUser = async (email) => {
  console.log(`"${email}"`, `email`);
  const query = `SELECT 1 FROM users WHERE EXISTS (SELECT 1 FROM users WHERE email = "${email}") ORDER BY email LIMIT 1`;

  return await pool.query(query);
};

const createUser = async (user) => {
  // create user in DB
  const query = `INSERT INTO users (email, hash, salt) VALUES ("${user.email}","${user.hash}","${user.salt}")`;

  await pool
    .query(query)
    .then(response => {
      if (response.affectedRows === 1) {
          return;
      }
    })
    .catch(err => {
      console.log(err, `error`);
      return err;
    });
  //   return await pool.query(query);
};

const getUser = async (email) => {
  let query = `SELECT * FROM users WHERE email = "${email}"`;

return await pool.query(query);

};

module.exports = {
  createUser,
  getUser,
  isExistingUser,
};
