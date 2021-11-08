const url =require("url");
const { getUserOperationsHistory } = require("../services/history-service");


 function getUserHistory(req,res){
    const urlRequest=url.parse(req.url, true);
    const email = urlRequest.query.email;
    getUserOperationsHistory(email).then(rows => {
        return res.status(200).json(rows);
      })
      .catch((err) => res.status(400).json({ message: err }));
}

module.exports={
    getUserHistory
}