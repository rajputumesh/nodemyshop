const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "mynodedb",
  port: "3306"
});

con.connect(function(err) {
  if (err) throw console.log('error = ',err);
  console.log("Connected!");
});

module.exports = con;