const mysql = require("mysql2");
const config = require("../config");
const bcrypt = require("bcrypt");
const connection1 = mysql
  .createConnection({
    host: config.host,
    password: config.password,
    user: config.user,
  })
  .promise();

async function dbInit() {
  await connection1
    .execute(`CREATE DATABASE if not exists ${config.database}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  const connection2 = mysql
    .createConnection({
      host: config.host,
      password: config.password,
      user: config.user,
      database: config.database,
    })
    .promise();
  await connection2
    .execute(
      `create table if not exists users
    (
        firstName varchar(20) not null,
        lastName varchar(20) not null,  
        email varchar(30) not null primary key,
        password varchar(100) not null,
        balance double not null,
        expences double not null
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  await connection2
    .execute(
      `create table if not exists incomes(
      userEmail varchar(30),
      category varchar(20) not null,
      value double not null,
      date datetime not null,
      foreign key (userEmail) references users(email)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  await connection2
    .execute(
      `create table if not exists savings(
      userEmail varchar(30),
      category varchar(20) not null,
      value double not null,
      icon varchar(255),
      foreign key (userEmail) references users(email)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  await connection2
    .execute(
      `create table if not exists spends(
      userEmail varchar(30),
      category varchar(20) not null,
      value double not null,
      icon varchar(255),
      date datetime not null,
      foreign key (userEmail) references users(email)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  await connection2
    .execute(
      `create table if not exists history
    (
        userEmail varchar(30),
        source enum('incomes','savings') not null,
        target enum('spends','savings') not null,
        sourceCategory varchar(20),
        targetCategory varchar(20) not null,
        value double not null,
        operationDate datetime not null,
        foreign key (userEmail) references users(email)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  await connection2
    .execute(
      `create table if not exists settings (
    userEmail varchar(30),
    language varchar(15),
    currencyCode varchar(3),
    foreign key (userEmail) references users(email)
  )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  connection2.execute(`select * from users`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into users (firstName,lastName,email,password,balance,expences)
    values('admin','','admin@gmail.com','${bcrypt.hashSync(
      "admin",
      8
    )}',9999,9999),
          ('billy','jean','billyj@gmail.com','${bcrypt.hashSync(
            "12345",
            8
          )}',10000,1000),
          ('pedro','paskal','p_paskal@gmail.com','${bcrypt.hashSync(
            "qwezxc",
            8
          )}',25000,2000)
          `
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from incomes`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into incomes (userEmail,category,value,date)
      values('admin@gmail.com','income',500,'2021-10-01 12:00:00'),
      ('p_paskal@gmail.com','income',500,'2021-10-01 12:00:00'),
      ('billyj@gmail.com','income',500,'2021-10-01 12:00:00')`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from savings`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into savings (userEmail,category,value,icon)
      values('admin@gmail.com','cash',500,'money'),
      ('admin@gmail.com','bank',500,'account_balance'),
      ('billyj@gmail.com','cash',500,'money'),
      ('billyj@gmail.com','bank',500,'account_balance'),
      ('p_paskal@gmail.com','cash',500,'money'),
      ('p_paskal@gmail.com','bank',500,'account_balance')`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from spends`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into spends (userEmail,category,value,icon,date)
      values('admin@gmail.com','girlfriend',500,'female','2021-10-01 12:00:00'),
      ('admin@gmail.com','food',500,'restaurant','2021-10-01 12:00:00'),
      ('billyj@gmail.com','utilities',500,'receipt','2021-10-01 12:00:00'),
      ('billyj@gmail.com','food',500,'restaurant','2021-10-01 12:00:00'),
      ('p_paskal@gmail.com','utilities',500,'receipt','2021-10-01 12:00:00'),
      ('p_paskal@gmail.com','food',500,'restaurant','2021-10-01 12:00:00')`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });
  connection2.execute(`select * from history`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2.execute(`insert into history (userEmail,source,target,sourceCategory,targetCategory,value,operationDate)
      values ('admin@gmail.com','incomes','savings','','bank',1,'2021-10-23 19:27:54'),
      ('admin@gmail.com','savings','spends','bank','food',27,'2021-10-23 19:29:31'),
      ('admin@gmail.com','savings','spends','cash','girlfriend',54,'2021-10-23 19:31:14')
      `);
    }
  });
  connection2.execute(`select * from settings`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2.execute(`insert into settings (userEmail,language,currencyCode)
      values ('admin@gmail.com','english','USD')`);
    }
  });
}

module.exports = {
  dbInit,
  connection: mysql
    .createConnection({
      host: config.host,
      password: config.password,
      user: config.user,
      database: config.database,
    })
    .promise(),
};
