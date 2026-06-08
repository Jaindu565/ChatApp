import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";

const router = Router();

router.post("/login", (req, res) => {
  const { number, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE user.mobile = '" +
      number +
      "' AND user.password = '" +
      password +
      "' ",
    (err, result:RowDataPacket[]) => {
      if (!err) {

        if(result.length == 1){
          res.status(200).send({ user:result[0]})
        }else{
          res.status(401).send( {msg:"Invalid Credentials"} )
        }

      } else {
        console.error(err.message);
        res.status(500).send(err.message);
      }
    }
  );
});

router.post("/register", (req, res) => {

  const { fname, lname, mobile, password} = req.body;

  db.query("SELECT * FROM user WHERE user.mobile = '"+ mobile +"'", (err, result:RowDataPacket[])=>{

    if(!err){
      if(result.length === 0) {

       db.query("INSERT INTO user (mobile, fname, lname, password) VALUES ('"+ mobile +"', '" + fname +  "', '" + lname + "', '" + password + "') ", (insetErr)=>{

        if (!insetErr) {
            res.status(201).send( {msg:"User Registered Successfully"});
        } else {
            res.status(500).send({msg:"Can't Register User"});
        }
       });
        
      }else {
        res.status(400).send({msg: "User Already Exists"});
      }

    }else{
      res.status(500).send({msg:"Something Went Wrong"});
    }
  });


})

export default router;
