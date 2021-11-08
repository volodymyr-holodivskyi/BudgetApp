const mysql = require("mysql2");
const { connection } = require("./db-service");

function getUserOperationsHistory(email){
    return connection.execute(`select source,target,sourceCategory,targetCategory,value,operationDate from history where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

module.exports={
    getUserOperationsHistory
}