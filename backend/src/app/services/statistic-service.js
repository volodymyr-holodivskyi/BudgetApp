const mysql = require("mysql2");
const { connection } = require("./db-service");

async function getUserStatistic(id){
    return connection.execute(`select category,value,date from spends where userId='${id}'`).then(([rows, fields]) =>{
       
        return rows;
    })
    .catch((err) => err);
    
}

module.exports={
    getUserStatistic
}