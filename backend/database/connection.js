const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:"test"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
})

var userSql = "CREATE TABLE if not exists users (id INT(50), user_name VARCHAR(255), user_email VARCHAR(255), user_passwd VARCHAR(255) , dept VARCHAR(255), create_date Date, status VARCHAR(255))";

conn.query(userSql, (err) => {
    if (err) throw err;
    console.log("User Table Created!");
})

var tokenSql = "CREATE TABLE if not exists token (id INT(50), user_id INT(50), user_token VARCHAR(255), token_status VARCHAR(255))";

conn.query(tokenSql, (err) => {
    if (err) throw err;
    console.log("Token Table Created!");
})

// var deptSql = "CREATE TABLE if not exists dept ()" 


module.exports = conn;