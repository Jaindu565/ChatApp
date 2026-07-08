import { Server } from "http";
import { WebSocketServer } from "ws";
import db from "./db";

export function startWebSocket(server: Server){

    const userConnections = new Map();

    const wsServer = new WebSocketServer({server});

    wsServer.on("connection",(ws)=>{
        console.log("connected to webSocket");

        ws.on("message", (data)=>{

            const msgData = JSON.parse(data.toString());

             if (msgData.type === "register") {
                //save to map
                userConnections.set(msgData.data,ws);
                console.log("Connection saved!"); 

             } else if (msgData.type === "chat") {
                //sent to reciver

console.log(msgData);
                
                const {data, receiver, sender, chatId} = msgData;
                
               const receiverWs = <WebSocket> userConnections.get(receiver);


//save to Db
               const pool = db.promise();

              try {

                 pool.query("INSERT INTO chat_history (message, sent_at, chat_chat_id,sender, msg_status_id) VALUES (?,?,?,?,?)",
                [data, new Date(),chatId, sender,1 ],
               );

              } catch (error) {
               console.log(error); 
              }
            
               //send to receiver
               if (receiverWs) {

                const msgData ={
                    message:data,
                    sent_at:new Date().toISOString(),
                    sender:sender
                };
                

                receiverWs.send(JSON.stringify(msgData));
                console.log("Msg Sent");
               }
            }
                
             
        });

        ws.on("close",()=>{

            userConnections.forEach((value,key) => {

                if (value === ws) userConnections.delete(key);

            });

        });
    });

}