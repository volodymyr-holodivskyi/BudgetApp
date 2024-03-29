const url =require("url")
const { getUserStatistic } = require("../services/statistic-service");


 function getUserStats(req,res){
    const urlRequest=url.parse(req.url, true);
    const id = urlRequest.query.id;
    getUserStatistic(id).then(rows => {
        return res.status(200).json(rows);
      })
      .catch((err) => res.status(400).json({ message: err }));
}

module.exports={
    getUserStats
}