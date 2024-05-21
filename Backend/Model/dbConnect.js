const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "ecommerce"
})
connection.connect((err,result)=>{
    if(err){
        console.log(err.sqlMessage)
    }
    else{
        console.log("database connect...")
    }
})
module.exports = connection