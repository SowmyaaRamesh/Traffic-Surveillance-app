const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let body;

const con = mysql.createConnection({
  host: "car-database.co12lhwitdnp.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "car_info",
});

con.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + con.threadId);
});

app.get("/updates", (req, res) => {
  let data;
  con.query("SELECT * FROM car_info.toll_table;", function (error, results) {
    if (error) throw error;
    else {
      // console.log(results[1]);
      data = {
        plateNum: results[1].licenseNumber,
        time: results[1].time_stamp,
      };
      // console.log(data);
      res.send(data);
    }
  });
});

app.get("/flagInfo", (req, res) => {
  con.query("SELECT * FROM car_info.car_database;", function (error, results) {
    if (error) throw error;
    else {
      // console.log(results);
      res.send(results);
    }
  });
});

app.post("/track", (req, res) => {
  body = req.body;
});

app.get("/track", (req, res) => {
  // console.log("get:", body);
  res.send(body);
});

app.post("/flagInfo", (req, res) => {
  let values = req.body.LP;
  var existingLP;
  //Add new license plate numbers to flagDB to track only if they don't exist in flagDB already
  con.query("SELECT * FROM car_info.flagDB;", function (error, results) {
    if (error) throw error;
    results = results.map((result) => Object.values(result)); //extract LP values from results-> array of objects
    existingLP = results.flat(1); //to remove nesting of arrays
    values = values.filter((item) => !existingLP.includes(item));
    // console.log(values);
    if (values.length) {
      values.forEach((lp) => {
        let sql = "INSERT INTO car_info.flagDB(license_plate_no) VALUES (?)";
        con.query(sql, [lp], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });
      });
    }
  });
});

app.listen(5000, (req, res) => {
  console.log("Server listening on port 5000");
});
