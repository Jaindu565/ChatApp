import { Router } from "express";
import db from "../db";
import { RowDataPacket } from "mysql2";

const router = Router();

router.get("/get-chats",(req,res)=>{

    const mobile = req.query.mobile;

db.query("SELECT * FROM chat WHERE chat.user_1 = '" + mobile +"' OR chat.user_2 = '" + mobile +  "' ", (err,result:RowDataPacket[])=>{
    if(!err){

        let finalChats = [];

        for (let i = 0; i < result.length; i++) {
            const chat = result[i];
            
            db.query("SELECT * FROM chat_history WHERE chat_chat_id = '" + chat.chat_id + "' ORDER BY sent_at DESC LIMIT 1",(err,messageResult:RowDataPacket[])=>{
                 
                if(!err) {
                    const lastMessage = messageResult[0];
                    const data ={

                    };
                } else {
                    
                }
        });

        }
    }else{
        res.status(500).send("");
    }
});

});

export default router;