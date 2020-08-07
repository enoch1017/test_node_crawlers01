const srcURL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001";
const token =require("./token.js");
const axios = require("axios");
//台北、新北、桃園/hr 即時天氣存db
//get jsonObj from srcURL
module.exports=async function getData (){
    try {
        const response = await axios.get(`${srcURL}`,{
            params:{
                Authorization:token.token
            }
        })
        var locationArr =await response.data.records.location
        var newArr = await locationArr.filter((item,index,array)=>{
            var num = item.parameter[1].parameterValue 
            return num=="01" || num=="06" || num=="08"
        })
        return newArr;
    } catch (error) {
        console.log(error);
        return Error(error.message)
    }
}
