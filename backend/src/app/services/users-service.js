const mysql = require("mysql2");
const { connection } = require("./db-service");

function getUserByEmail(email) {
  return connection
    .execute(`select * from users where email='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserIncomes(email) {
  return connection
    .execute(`select category,value from incomes where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserSavings(email) {
  return connection
    .execute(`select category,value from savings where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserSpends(email) {
  return connection
    .execute(`select category,value from spends where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

module.exports = {
  getUserByEmail,
  getUserIncomes,
  getUserSavings,
  getUserSpends,
};
