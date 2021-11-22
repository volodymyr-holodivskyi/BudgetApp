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
        id int auto_increment primary key,
        firstName varchar(20) not null,
        lastName varchar(20) not null,  
        email varchar(30) not null unique,
        password varchar(100) not null,
        balance double not null,
        expences double not null,
        lastVisitDate datetime not null,
        avatar varchar(100) 
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  await connection2
    .execute(
      `create table if not exists incomes(
      userId int,
      category varchar(20) not null,
      value double not null,
      date datetime not null,
      foreign key (userId) references users(id)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  await connection2
    .execute(
      `create table if not exists savings(
      userId int,
      category varchar(20) not null,
      value double not null,
      icon varchar(255),
      foreign key (userId) references users(id)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  await connection2
    .execute(
      `create table if not exists spends(
      userId int,
      category varchar(20) not null,
      value double not null,
      icon varchar(255),
      date datetime not null,
      foreign key (userId) references users(id)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  await connection2
    .execute(
      `create table if not exists history
    (
        userId int,
        source enum('incomes','savings') not null,
        target enum('spends','savings') not null,
        sourceCategory varchar(20),
        targetCategory varchar(20) not null,
        value double not null,
        operationDate datetime not null,
        foreign key (userId) references users(id)
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  await connection2
    .execute(
      `create table if not exists settings (
    userId int,
    language varchar(15),
    currencyCode varchar(3),
    foreign key (userId) references users(id)
  )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  connection2.execute(`select * from users`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into users (firstName,lastName,email,password,balance,expences,lastVisitDate)
    values('admin','','admin@gmail.com','${bcrypt.hashSync(
      "admin",
      8
    )}',9999,9999,'2021-10-01 12:00:00'),
          ('billy','jean','billyj@gmail.com','${bcrypt.hashSync(
            "12345",
            8
          )}',10000,1000,'2021-10-01 12:00:00'),
          ('pedro','paskal','p_paskal@gmail.com','${bcrypt.hashSync(
            "qwezxc",
            8
          )}',25000,2000,'2021-10-01 12:00:00')
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
          `insert into incomes (userId,category,value,date)
      values(1,'income',500,'2021-10-01 12:00:00'),
      (2,'income',500,'2021-10-01 12:00:00'),
      (3,'income',500,'2021-10-01 12:00:00')`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from savings`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into savings (userId,category,value,icon)
      values(1,'cash',500,'money'),
      (1,'bank',500,'account_balance'),
      (2,'cash',500,'money'),
      (2,'bank',500,'account_balance'),
      (3,'cash',500,'money'),
      (3,'bank',500,'account_balance')`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from spends`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into spends (userId,category,value,icon,date)
      values(1,'girlfriend',500,'female','2021-11-01 12:00:00'),
      (1,'food',500,'restaurant','2021-11-01 12:00:00'),
      (1,'girlfriend',400,'female','2021-10-01 12:00:00'),
      (1,'food',300,'restaurant','2021-10-01 12:00:00'),
      (1,'girlfriend',200,'female','2021-09-01 12:00:00'),
      (1,'food',400,'restaurant','2021-09-01 12:00:00'),
      (1,'girlfriend',500,'female','2021-08-01 12:00:00'),
      (1,'food',400,'restaurant','2021-08-01 12:00:00'),
      (1,'girlfriend',300,'female','2021-07-01 12:00:00'),
      (1,'food',500,'restaurant','2021-07-01 12:00:00'),
      (2,'utilities',500,'receipt','2021-10-01 12:00:00'),
      (2,'food',500,'restaurant','2021-10-01 12:00:00'),
      (3,'utilities',500,'receipt','2021-10-01 12:00:00'),
      (3,'food',500,'restaurant','2021-10-01 12:00:00')`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });
  connection2.execute(`select * from history`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2.execute(`insert into history (userId,source,target,sourceCategory,targetCategory,value,operationDate)
      values (1,'incomes','savings','','bank',1,'2021-10-23 19:27:54'),
      (1,'savings','spends','bank','food',27,'2021-10-23 19:29:31'),
      (1,'savings','spends','cash','girlfriend',54,'2021-10-23 19:31:14')
      `);
    }
  });
  connection2.execute(`select * from settings`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2.execute(`insert into settings (userId,language,currencyCode)
      values (1,'english','USD')`);
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
