const mysql = require("mysql2");
const { connection } = require("./db-service");

function getUserSettings(email){
    return connection.execute(`select language,currencyCode from settings where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

module.exports={
    getUserSettings
}