//import statements
const express = require("express");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os = require("os");

//config
const cpuCors = os.cpus().length;

//app init
const server = express();
//middlewars

server.get("/", (req, res) => {
  res.send("welcome to site");
  cluster.worker.kill()
});

if (cluster.isMaster) {
  for (let i = 0; i < cpuCors; i++) {
    cluster.fork(); // to create worker process
  }
  cluster.on("exit",(worker,code,signal)=>{
    console.log(`worker ${worker.process.pid} has been killed`)
  })
} else {
  server.listen(8000, () => console.log("server started on 8000"));
}

//server start
//server.listen(8000, () => console.log("server started on 8000"));