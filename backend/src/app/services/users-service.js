const mysql = require("mysql2");
const { connection } = require("./db-service");


function getUserByEmail(email){
  return connection
    .execute(`select * from users where email='${email}'`)
    .then(([rows, fields]) => rows[0])
    .catch((err) => err);
}

function getUserIncomes(email) {
  return connection
    .execute(`select category,value from incomes where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserIncomeValue(email,category){
  return connection.execute(`select value from incomes where userEmail='${email}' and category='${category}'`)
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

function getUserSavings(email) {
  return connection
    .execute(`select category,value,icon from savings where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserSavingValue(email,category){
  return connection.execute(`select value from savings where userEmail='${email}' and category='${category}'`)
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

function getUserSpends(email) {
  return connection
    .execute(`select category,value,icon from spends where userEmail='${email}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserSpendValue(email,category){
  return connection.execute(`select value from spends where userEmail='${email}' and category='${category}'`)
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

async function updateUserIncomes(email, category, value,operation) {
  let updatedIncome=await getUserIncomeValue(email,category).then(rows=>rows.value)
  switch(operation){
    case '+':updatedIncome+=value; break;
    case '-':updatedIncome-=value; break;
  }
  return connection
    .execute(
      `update incomes set value='${updatedIncome}' where category='${category}' and userEmail='${email}'`
    )
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

async function updateUserSavings(email, category, value,operation) {
  let updatedSaving=await getUserSavingValue(email,category).then(rows=>rows.value)
  switch(operation){
    case '+':updatedSaving+=value; break;
    case '-':updatedSaving-=value; break;
  }
  return connection
    .execute(
      `update savings set value='${updatedSaving}' where category='${category}' and userEmail='${email}'`
    )
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

async function updateUserSpends(email, category, value,operation) {
  let updatedSpend=await getUserSpendValue(email,category).then(rows=>rows.value)
  switch(operation){
    case '+':updatedSpend+=value; break;
    case '-':updatedSpend-=value; break;
  }
  return connection
    .execute(
      `update spends set value='${updatedSpend}' where category='${category}' and userEmail='${email}'`
    )
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

async function updateUserBalance(email,value,operation){
  let updatedBalance= await getUserByEmail(email).then(rows=>rows.balance);
  switch(operation){
    case '+':updatedBalance+=value; break;
    case '-':updatedBalance-=value; break;
  }
  return connection
  .execute(
    `update users set balance='${updatedBalance}' where email='${email}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

async function updateUserExpences(email,value,operation){
  let updatedExpences= await getUserByEmail(email).then(rows=>rows.expences);
  switch(operation){
    case '+':updatedExpences+=value; break;
    case '-':updatedExpences-=value; break;
  }
  return connection
  .execute(
    `update users set expences='${updatedExpences}' where email='${email}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

module.exports = {
  getUserByEmail,
  getUserIncomes,
  getUserSavings,
  getUserSpends,
  updateUserIncomes,
  updateUserSavings,
  updateUserSpends,
  updateUserBalance,
  updateUserExpences
};
