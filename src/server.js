const express = require("express")
const port = process.env.PORT || 8080
const weatherCrawler = require("./weatherCrawler");
const bodyParser = require("body-parser");
const app = express()
const rootRouter = express.Router()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
rootRouter.get("/Data_weather/get/:cityNum",(req,res,next)=>{
})

app.use("/Data_weather/",rootRouter)
app.listen(port,function() {
  console.log("server opened at:"+port);
});