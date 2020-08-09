const mysql = require("mysql");
//const dbconfig = require("./dbconfig");

module.exports=function Handler(dbconfig){
    this.initialConnect=function(){
        this.connection = mysql.createConnection(dbconfig);
        this.connection.connect(err=>{
          if(err){
            console.log('error when connecting to db',err);
            setTimeout(()=>{
              this.initialConnect(dbconfig);
            },2000);
          }else{
	  	console.log("success loging");
		//console.log(this.connection);
	  }
        });
        this.connection.on('error',(err)=>{
          console.log('db error',err);
          if(err.code=='PROTOCOL_CONNECTION_LOST'){
            console.log(err.code);
            this.initialConnect(dbconfig);
          }else{
            throw err;
          }
        });
    },
    this.selectData=function(query){
        return new Promise((resolve,reject)=>{
            let selectSQL = mysql.format(`Select * from weather  where countryNumber=?`,query.countryNumber);
            this.connection.query(selectSQL,(err,result)=>{
                if(err)
                    reject(new Error(err.message))
                resolve(result)
            });
        })
    },
    this.insertData=function(table,infoData){
        //console.log(infoData)
	    return new Promise((resolve,reject)=>{
            let insertSQL = mysql.format(`Insert into ${table}(countryName,countryNumber,obsTime,ELEV,WDIR,WDSD,TEMP,HUMD,PRES,R24)VALUES ?`,[infoData]);
            this.connection.query(insertSQL,(err,result)=>{
                console.log(err);
		console.log(result);
		if(err)
                    reject(new Error(err.message))
		resolve(result)
            });
        })
    },
    this.updateDate=function(){},
    this.deleteData=function(){},
    this.end=function(){
        this.connection.end();
    }
}
