const express = require("express")
const port = process.env.PORT || 8080
const weatherCrawler = require("./weatherCrawler");
// const url = require("url");
// const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express()
const rootRouter = express.Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
rootRouter.get("/home",(req,res,next)=>{
  res.send("home page")
})
rootRouter.get("/about",(req,res,next)=>{
  res.send("about page")
})
app.use("/",rootRouter)
app.listen(port,function() {
  console.log("server opened at:"+port);
});

// get -> retrive(select)
// post -> insert
// put -> update
// delete -> delete