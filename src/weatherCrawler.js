const srcURL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001";
const token =require("../token");
const axios = require("axios");
const dbHandler =require("../Database/dbHandler");
//get jsonObj from srcURL
async function getData (){
    try {
        const {data} = await axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-EDE6F6C1-FCCB-40F3-ADB5-C1130A244EB8')
        var locationArr = await data.records.location
        var filterArr =  await locationArr.filter((item,index,array)=>{
            var num = item.parameter[1].parameterValue
            return num=="01" || num=="06" || num=="08"
        })
        const arrangeArr= await filterArr.map((item,index)=>{
            let infoObj ={
                countryName:item.parameter[0].parameterValue,
                countryNumber:item.parameter[1].parameterValue,
                obsTime:item.time.obsTime,
                ELEV :item.weatherElement[0].elementValue,
                WDIR :item.weatherElement[1].elementValue,
                WDSD :item.weatherElement[2].elementValue,
                TEMP :item.weatherElement[3].elementValue,
                HUMD :item.weatherElement[4].elementValue,
                PRES :item.weatherElement[5].elementValue,
                R24:item.weatherElement[6].elementValue
            }
            return infoObj
        })
        return arrangeArr;
    } catch (error) {
        console.log(error);
        return Error(error.message)
    }
}
//dbHandler.initialConnect()
getData()
.then(data=>{
    console.log(data)
    return dbHandler.insertData(data)
})
.then(result=>{
    console.log(result);
})
.catch(err=>{
    console.error(err)
})


