const mysql = require("mysql2");
const { connection } = require("./db-service");

function getUserOperationsHistory(id){
    return connection.execute(`select source,target,sourceCategory,targetCategory,value,operationDate from history where userId='${id}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

 function addUserOperationIntoHistory(id,source,target,sourceCategory,targetCategory,value,operationDate){
     
    return connection.execute(`insert into history (userId,source,target,sourceCategory,targetCategory,value,operationDate)
                                values (${id},'${source}','${target}','${sourceCategory}','${targetCategory}',${value},'${operationDate}')`)
    .then(([rows, fields]) => rows)
    .catch((err) => {
        console.log(err);
    });
   
}


module.exports={
    getUserOperationsHistory,
    addUserOperationIntoHistory
}