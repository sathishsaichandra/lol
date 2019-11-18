const mysql=require('mysql');
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sathis@143",
    database:"naa savu nenu sastha nikenduku"
});
module.exports=connection;