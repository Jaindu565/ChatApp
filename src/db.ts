import mysql from "mysql2";

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"JAINDUdemitha@20061212?",
    database:"chat-app"
});

db.connect((err)=>{
    if(!err){
        console.log("Connected to Database");
    }else{
        console.error(err.message);
    }
});

export default db;