// // use module . export
// const notes = require("./notes");

const { json } = require("express");

// var age = notes.age;
// console.log(age)
// const result = notes.addnum(age + 5, 5);
// console.log(result);

// console.log("server file is running");

// // use lodash to find unique=====================

// const _ = require("lodash");

// var data = ["hello", "age", 1, 8, 1, 9, 8, "age", "hello", "cool",'guddu'];

// let filter = _.uniq(data);

// console.log(filter);

// Json to conver json data into normal data  ========

// const jsonSring = '{"name":"ashik","age":24,"city":"indore"}'

// const jsonObject= JSON.parse(jsonSring)

// console.log(jsonObject)

//  normal  data conver into json===========

// const objectToConvert = {name:'ashik',age:25}

// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(jsonStringified)

// let make server adnd how server run  ============

//  connection of mongodb

const db = require("./db");
const express = require("express");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("hello world ");
});

// import the router file
const personRouter = require("./routers/personRouters");
const menuRouter = require("./routers/menuRouters");
// use the router
app.use("/person", personRouter);
app.use("/menu", menuRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// {
//     "name": "Amit",
//     "age": 40,
//     "work": "chef",
//     "mobile": "9751-25-948",
//     "email": "abc@gmail.com",
//     "address": "indore",
//     "salary": "45000"
// }
