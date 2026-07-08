import express from "express";
import user from "./routes/user";
import chat from "./routes/chat";
import chatHistory from "./routes/chat-history";
import http from "http";
import { startWebSocket } from "./webSocket";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("welcome to ChatApp API");
});

app.use("/user",user);
app.use("/chat",chat);
app.use("/chat-history",chatHistory);

const server = http.createServer(app);

startWebSocket(server);


//app.listen
server.listen(3000,()=>{
console.log("API Started...");
console.log("API URL: http://localhost:3000");

});