//import statements
const express = require("express");
const dotenv = require("dotenv");
let LOGIN_SUCCESS = false;
//config
dotenv.config();
const port = process.env.PORT || 8000;

//server init
const server = express();

//server middlewares
server.use(express.json());
const checkUser = (req, res, next) =>
  LOGIN_SUCCESS ? next() : res.status(401).send("Unauthorised..");

//server routes or apis
// GET - read the data 200 - OK (default)
// POST - Create the data 201 - OK, created
// PUT/PATCH - Update the data 200-OK (default)
// DELETE - Delete the data 200 - OK

//status codes
//success
//200 - OK (default)
//201 - Ok created
//304 - Ok not modified (default)
//error
//400 - bad request (when your api or service required some data from FE but it wasn't send)
//401 - unauthorised (default)
//404 - Not found (default)
//500 - Internal server error (when some part of your code has broken)
server.get("/", (req, res) => {
  res.send("Hey welcome to our server");
});

//static routing
// server.get("/user/imran",(req,res)=>{
//   res.send("Hey user imran");
// })
// server.get("/user/shailash", (req, res) => {
//   res.send("Hey user shailash");
// });

// we can take the data from req object by three ways
// 1. params - (one data)
// 2. query string - (more than one if data is public)
// 3. body
//dynamic routing
server.get("/user/:name", (req, res) => {
  console.log(req.params);
  res.send("hey user " + req.params.name);
});

server.get("/data", (req, res) => {
  res.send(req.query);
});

server.post("/user/authenticate", (req, res) => {
  const { username, password } = req.body || {};
  if (username == "imran" && password == process.env.PASSWORD) {
    LOGIN_SUCCESS = true;
    res.send(`hey ${username}, you're authenticated successfully..`);
  } else {
    LOGIN_SUCCESS = false;
    res.status(401).send("Invalid username or password");
  }
});

server.get("/userData", checkUser, (req, res) => {
  res.send("users data");
});

//server start
server.listen(port, () => console.log("server started on port " + port));
