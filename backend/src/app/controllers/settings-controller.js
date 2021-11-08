const url =require("url");
const {getUserSettings} = require("../services/settings-service");


 function getUserSettingsC(req,res){
    const urlRequest=url.parse(req.url, true);
    const email = urlRequest.query.email;
    getUserSettings(email).then(rows => {
        return res.status(200).json(rows);
      })
      .catch((err) => res.status(400).json({ message: err }));
}

module.exports={
    getUserSettingsC
}