const mysql = require("mysql");
const dbconfig = require("./dbconfig");
module.exports={
    initialConnect:function(dbconfig){
        this.connection = mysql.createConnection(dbconfig);
        this.connection.connect(err=>{
          if(err){
            console.log('error when connecting to db',err);
            setTimeout(()=>{
              this.initialConnect(dbconfig);
            },2000);
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
    retriveData:function(table,query){
        return new Promise((resolve,reject)=>{
            let retriveSQL = mysql.format(`Select * from ${table} where countryNumber=?`,query);
            this.connection.query(retriveSQL,(err,result)=>{
                if(err)
                    reject(new Error(err.message))
                resolve(result)
            });
        })
    },
    insertData:function(table,infoData){

        return new Promise((resolve,reject)=>{
            let insertSQL = mysql.format(`Insert into ${table} VALUES ?`,infoData);
            this.connection.query(insertSQL,(err,result)=>{
                if(err)
                    reject(new Error(err.message))
                resolve(result)
            });
        })
    },
    updateDate:function(){},
    deleteData:function(){},
    end:function(){
        this.connection.end();
    }
}
