const url =require("url");
const { getUserOperationsHistory, addUserOperationIntoHistory } = require("../services/history-service");


 function getUserHistory(req,res){
    const urlRequest=url.parse(req.url, true);
    const id = urlRequest.query.id;
    getUserOperationsHistory(id).then(rows => {
        return res.status(200).json(rows);
      })
      .catch((err) => res.status(400).json({ message: err }));
}

async function addToHistory(req,res){
    const {id,operationInfo}=req.body;
    await addUserOperationIntoHistory(id,operationInfo.source,operationInfo.target,operationInfo.sourceCategory,operationInfo.targetCategory,+operationInfo.value,operationInfo.operationDate).then();
    getUserOperationsHistory(id).then(rows => {
        return res.status(200).json(rows);
      })
      .catch((err) => res.status(400).json({ message: err }));

}

module.exports={
    getUserHistory,
    addToHistory
}