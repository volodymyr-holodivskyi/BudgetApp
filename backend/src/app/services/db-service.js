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
        balance int not null,
        expences int not null
    )`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  await connection2
    .execute(
      `create table if not exists incomes(
      userEmail varchar(30),
      category varchar(20) not null,
      value int not null,
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
      value int not null,
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
      value int not null,
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
        operationType enum('profit','costs') not null,
        value int not null,
        operationDate datetime not null,
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
    )}',9999999,99999),
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
          `insert into incomes (userEmail,category,value)
      values('admin@gmail.com','salary',500),
      ('p_paskal@gmail.com','salary',500),
      ('billyj@gmail.com','salary',500),
      ('admin@gmail.com','bonus',300)`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from savings`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into savings (userEmail,category,value)
      values('admin@gmail.com','cash',500),
      ('admin@gmail.com','bank',500),
      ('billyj@gmail.com','cash',500),
      ('billyj@gmail.com','bank',500),
      ('p_paskal@gmail.com','cash',500),
      ('p_paskal@gmail.com','bank',500)`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  connection2.execute(`select * from spends`).then(([rows, fields]) => {
    if (rows.length === 0) {
      connection2
        .execute(
          `insert into spends (userEmail,category,value)
      values('admin@gmail.com','girlfriend',500),
      ('admin@gmail.com','food',500),
      ('billyj@gmail.com','utilities',500),
      ('billyj@gmail.com','food',500),
      ('p_paskal@gmail.com','utilities',500),
      ('p_paskal@gmail.com','food',500)`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
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
