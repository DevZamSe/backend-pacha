const mysql = require('mysql');
const config = require("./../../config/config").CONFIGURATIONS.DATABASE.MYSQL;
console.log(config)
const pool = mysql.createPool({
    connectionLimit: 190,
    host     :  config.HOST,
    user     : config.USER,
    password : config.PASSWORD,
    database: config.DATABASE
  });

  module.exports = {
    query: async function(text, params){
    return new Promise((resolve,reject)=>{
      pool.query(text, params,function(err,result){
        if(err){console.log(err);return}
        resolve(result)
      })
    })
      
    } 
  }


// // module.exports = new MySQLConnect();