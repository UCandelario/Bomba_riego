const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "(Ur$07121998",
  database: "br_pruebas",
});

mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Conectado a la DB");
});
module.exports = mysqlConnection;
