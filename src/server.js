const express = require("express");
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const app = express();
const dbWork = require("../Database/dbHandler");
const rootRouter = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dbconfig = require("../Database/dbconfig");
const dbHelper = new dbWork(dbconfig)
rootRouter.get("/get/:countryNumber",(req,res,next)=>{
	dbHelper.initialConnect()
	console.log(req.params.countryNumber);
	dbHelper.selectData(req.params)
	.then(result=>{
		res.json(result)
	})
	.catch(err=>{
		res.json(err)
	})
})

app.use("/Data_weather/",rootRouter)
app.listen(port,function() {
  console.log("server opened at:"+port);
});
