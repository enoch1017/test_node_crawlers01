const srcURL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001";
const token =require("../token");
const axios = require("axios");
const dbWork =require("../Database/dbHandler");
const dbconfig =require("../Database/dbconfig")
//get jsonObj from srcURL
async function getData (){
    try {
        const {data} = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization='+token.token)
        var locationArr = await data.records.location
        var filterArr =  await locationArr.filter((item,index,array)=>{
            var num = item.parameter[1].parameterValue
            return num=="01" || num=="06" || num=="08"
        })
        const arrangeArr= await filterArr.map((item,index)=>{
            let infoObj =[
                item.parameter[0].parameterValue,
                item.parameter[1].parameterValue,
                item.time.obsTime,
                item.weatherElement[0].elementValue,
                item.weatherElement[1].elementValue,
                item.weatherElement[2].elementValue,
                item.weatherElement[3].elementValue,
                item.weatherElement[4].elementValue,
                item.weatherElement[5].elementValue,
                item.weatherElement[6].elementValue
             ]
            return infoObj
        })
        return arrangeArr;
    } catch (error) {
        console.log(error);
        return Error(error.message)
    }
}
//dbHandler.initialConnect(dbconfig)
let dbHelper = new dbWork(dbconfig);
dbHelper.initialConnect()
getData()
.then(data=>{
   // console.log(data)
    return dbHelper.insertData("weather",data)
})
.then(result=>{
    console.log(result);
    dbHelper.end();
})
.catch(err=>{
    console.error(err)
})


