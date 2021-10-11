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
} = require("../services/users-service");
const url =require("url")
  
async function moveIncomeIntoSavings(req, res) {
  const { email, incomesCategory, savingsCategory, value } = req.body;
  
  await updateUserIncomes(email, incomesCategory, value, "-");
  await updateUserSavings(email, savingsCategory, value, "+");
  await getUserByEmail(email)
    .then(async (rows) => {
      let user = rows;
      await getUserIncomes(email).then((rows) => (user.incomes = rows));
      await getUserSavings(email).then((rows) => (user.savings = rows));
      await getUserSpends(email).then((rows) => (user.spends = rows));
      return res.status(200).json({ user: user });
    })
    .catch((err) => res.status(400).json({ message: err }));
}

async function moveSavingsIntoSpends(req, res) {
  const { email, savingsCategory, spendsCategory, value } = req.body;
  
  await updateUserSavings(email, savingsCategory, value, "-");
  await updateUserSpends(email, spendsCategory, value, "+");
  await updateUserBalance(email, value, "-");
  await updateUserExpences(email, value, "+");
  await getUserByEmail(email)
    .then(async (rows) => {
      let user = rows;
      await getUserIncomes(email).then((rows) => (user.incomes = rows));
      await getUserSavings(email).then((rows) => (user.savings = rows));
      await getUserSpends(email).then((rows) => (user.spends = rows));
      return res.status(200).json({ user: user });
    })
    .catch((err) => res.status(400).json({ message: err }));
}

function getUserInfo(req,res){
    let urlRequest=url.parse(req.url, true);
    const email = urlRequest.query.email;
    return getUserByEmail(email)
    .then(async (rows) => {
      let user = rows;
      await getUserIncomes(email).then((rows) => (user.incomes = rows));
      await getUserSavings(email).then((rows) => (user.savings = rows));
      await getUserSpends(email).then((rows) => (user.spends = rows));
      return res.status(200).json({ user: user });
    })
    .catch((err) => res.status(400).json({ message: err }));
} 

module.exports = { 
  moveIncomeIntoSavings,
  moveSavingsIntoSpends,
  getUserInfo
};
 