const bcrypt = require("bcrypt");
const {
  updateUserIncomes,
  updateUserSavings,
  updateUserSpends,
  getUserByEmail,
  updateUserBalance,
  updateUserExpences,
  getUserIncomes,
  getUserSavings,
  getUserSpends,
  getUserById,
  updateUserLastVisitDate,
  changeUserBalance,
  updateUserField
} = require("../services/users-service");
const url =require("url")
  
async function moveIncomeIntoSavings(req, res) {
  const { id, incomesCategory, savingsCategory, value } = req.body;
  
  await updateUserIncomes(id, incomesCategory, value, "-");
  await updateUserSavings(id, savingsCategory, value, "+");
  await getUserById(id)
    .then(async (rows) => {
      let user = rows;
      await getUserIncomes(id).then((rows) => (user.incomes = rows));
      await getUserSavings(id).then((rows) => (user.savings = rows));
      await getUserSpends(id).then((rows) => (user.spends = rows));
      return res.status(200).json({ user: user });
    })
    .catch((err) => res.status(400).json({ message: err }));
}

async function moveSavingsIntoSpends(req, res) {
  const { id, savingsCategory, spendsCategory, value } = req.body;
  
  await updateUserSavings(id, savingsCategory, value, "-");
  await updateUserSpends(id, spendsCategory, value, "+");
  await updateUserBalance(id, value, "-");
  await updateUserExpences(id, value, "+");
  await getUserById(id)
    .then(async (rows) => {
      let user = rows;
      await getUserIncomes(id).then((rows) => (user.incomes = rows));
      await getUserSavings(id).then((rows) => (user.savings = rows));
      await getUserSpends(id).then((rows) => (user.spends = rows));
      return res.status(200).json({ user: user });
    })
    .catch((err) => res.status(400).json({ message: err }));
}

function getUserInfo(req,res){
    const urlRequest=url.parse(req.url, true);
    const id = urlRequest.query.id;
    return getUserById(id)
    .then(async (rows) => {
      let user = rows;
      await getUserIncomes(id).then((rows) => (user.incomes = rows));
      await getUserSavings(id).then((rows) => (user.savings = rows));
      await getUserSpends(id).then((rows) => (user.spends = rows));
      return res.status(200).json({ user: user });
    })
    .catch((err) => res.status(400).json({ message: err }));
} 

async function UpdateUserBalance(req,res){
  const { id, value } = req.body;
  await changeUserBalance(id,value);
  await getUserById(id)
    .then(async (rows) => {
      return res.status(200).json({ user: rows });
    })
    .catch((err) => res.status(400).json({ message: err }));
}

function checkPassword(req,res){
  const { id, password } = req.body;
  return getUserById(id).then(async rows=>{
    const validPassword = bcrypt.compareSync(password, rows.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    return res.status(200).json({ message: "OK" })
  })
 
}

async function updateUserProfile(req,res){
  const {id,userData}=req.body;
  await getUserById(id).then(async rows=>{
    let user=rows;
    for (const key in user) {
      if (Object.hasOwnProperty.call(user, key)) {
        if(user[key]!==userData[key]){
          await updateUserField(id,key,userData[key]);
        }
        
      }
    }
    
  })
  return getUserById(id).then(user=>{
    console.log(user);
    return res.status(200).json({ user: user })
  })
  .catch((err) => res.status(400).json({ message: err }));
 
}


module.exports = { 
  moveIncomeIntoSavings,
  moveSavingsIntoSpends,
  getUserInfo,
  UpdateUserBalance,
  checkPassword,
  updateUserProfile
};
 