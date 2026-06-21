import express from "express";
import user from "./routes/user";
import chat from "./routes/chat";
import chatHistory from "./routes/chat-history";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("welcome to ChatApp API");
});

app.use("/user",user);
app.use("/chat",chat);
app.use("/chat-history",chatHistory)


app.listen(3000,()=>{
console.log("API Started...");
console.log("API URL: http://localhost:3000");

});