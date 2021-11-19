const mysql = require("mysql2");
const { connection } = require("./db-service");

async function getUserStatistic(email){
    let totalExpences;
    await connection.execute(`select expences from users where email='${email}'`).then(([rows, fields]) =>totalExpences=rows[0].expences)
    .catch((err) => err);
    return connection.execute(`select category,value,date from spends where userEmail='${email}'`).then(([rows, fields]) =>{
        rows.map((e)=>{
            e.value/=parseFloat(totalExpences);
            e.value=e.value.toFixed(2);
            return e;
        })
        return rows;
    })
    .catch((err) => err);
    
}

module.exports={
    getUserStatistic
}