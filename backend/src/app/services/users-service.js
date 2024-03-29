const mysql = require("mysql2");
const { connection } = require("./db-service");


function getUserByEmail(email){
  return connection
    .execute(`select * from users where email='${email}'`)
    .then(([rows, fields]) => rows[0])
    .catch((err) => err);
}

function getUserById(id){
  return connection
    .execute(`select * from users where id='${id}'`)
    .then(([rows, fields]) => rows[0])
    .catch((err) => err);
}

function getUserIncomes(id) {
  return connection
    .execute(`select category,value from incomes where userId='${id}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserIncomeValue(id,category){
  return connection.execute(`select value from incomes where userId='${id}' and category='${category}'`)
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

function getUserSavings(id) {
  return connection
    .execute(`select category,value,icon from savings where userId='${id}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserSavingValue(id,category){
  return connection.execute(`select value from savings where userId='${id}' and category='${category}'`)
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

function getUserSpends(id) {
  return connection
    .execute(`select category,value,icon,date from spends where userId='${id}'`)
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

function getUserSpendValue(id,category,date){
  return connection.execute(`select value from spends where userId='${id}' and category='${category}' and date='${date}'`)
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

async function updateUserIncomes(id, category, value,operation) {
  let updatedIncome=await getUserIncomeValue(id,category).then(rows=>rows.value)
  switch(operation){
    case '+':updatedIncome+=value; break;
    case '-':updatedIncome-=value; break;
  }
  return connection
    .execute(
      `update incomes set value='${updatedIncome}' where category='${category}' and userId='${id}'`
    )
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

async function updateUserSavings(id, category, value,operation) {
  let updatedSaving=await getUserSavingValue(+id,category).then(rows=>{
    return rows.value
  })
  switch(operation){
    case '+':updatedSaving+=value; break;
    case '-':updatedSaving-=value; break;
  }
  return connection
    .execute(
      `update savings set value='${updatedSaving}' where category='${category}' and userId='${id}'`
    )
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

async function updateUserSpends(id, category, value,operation,date) {
  let updatedSpend=await getUserSpendValue(id,category,date).then(rows=>{
   return rows.value;
  });
  
  switch(operation){
    case '+':updatedSpend+=value; break;
    case '-':updatedSpend-=value; break;
  }
  return connection
    .execute(
      `update spends set value='${updatedSpend}' where category='${category}' and userId='${id}' and date='${date}'`
    )
    .then(([rows, fields]) => rows)
    .catch((err) => err);
}

async function updateUserBalance(id,value,operation){
  let updatedBalance= await getUserById(id).then(rows=>rows.balance);
  switch(operation){
    case '+':updatedBalance+=value; break;
    case '-':updatedBalance-=value; break;
  }
  return connection
  .execute(
    `update users set balance='${updatedBalance}' where id='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

async function updateUserExpences(id,value,operation){
  let updatedExpences= await getUserById(id).then(rows=>rows.expences);
  switch(operation){
    case '+':updatedExpences+=value; break;
    case '-':updatedExpences-=value; break;
  }
  return connection
  .execute(
    `update users set expences='${updatedExpences}' where id='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

async function updateUserLastVisitDate(id){
  let tmpDate=new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-');
  let tmpTime=new Date().toLocaleTimeString('ru-RU');
  let currentDate=tmpDate+' '+tmpTime;
  return connection
  .execute(
    `update users set lastVisitDate='${currentDate}' where id='${id}'`
  )
  .then(([rows, fields]) => currentDate)
  .catch((err) => err);
  
}

async function setUserBalance(id){
  let result=0;
  let totalSavings =await getUserSavings(id).then(rows=>rows);
  for (const item of totalSavings) {
    result+=item.value;
  }
  return connection
  .execute(
    `update users set balance=${result} where id='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

async function setUserExpences(id){
  let result=0;
  let totalSpends =await getUserSpends(id).then(rows=>rows);
  totalSpends=totalSpends.filter(e=>{
    return e.date.toLocaleDateString('ru-RU').split('.')[1]==new Date().getMonth()+1
  })
  for (const item of totalSpends) {
    result+=item.value;
  }
  return connection
  .execute(
    `update users set expences=${result} where id='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}


async function changeUserBalance(id,value){
  return connection
  .execute(
    `update users set balance=${+value} where id='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

function updateUserField(id,fieldName,value){
  return connection
  .execute(
    `update users set ${fieldName}='${value}' where id='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

function getUserAvatarImage(id){
  return connection
  .execute(
    `select image from avatarsImages where userId='${id}'`
  )
  .then(([rows, fields]) => rows[0])
  .catch((err) => err);
}

function updateUserAvatarImage(id,img){
  return connection
  .execute(
    `update avatarsImages set image='${img}' where userId='${id}'`
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}

function updateCategory(id,section,prevCategoryName,editData){
  console.log(editData);
  let sql=`update ${section} set category='${editData.category}',value='${+editData.value}',icon='${editData.icon}' where userId='${id}' and category='${prevCategoryName}'`;
  if(editData.date) sql+=` and date='${editData.date}'`;
  return connection
  .execute(
    sql
  )
  .then(([rows, fields]) => rows)
  .catch((err) => err);
}



module.exports = {
  getUserById,  
  getUserByEmail,
  getUserIncomes,
  getUserSavings,
  getUserSpends,
  updateUserIncomes,
  updateUserSavings,
  updateUserSpends,
  updateUserBalance,
  updateUserExpences,
  updateUserLastVisitDate,
  changeUserBalance,
  updateUserField,
  getUserAvatarImage,
  updateUserAvatarImage,
  setUserBalance,
  setUserExpences,
  updateCategory
};
