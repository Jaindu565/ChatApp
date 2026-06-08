import express from "express";
import user from "./routes/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("welcome to ChatApp API");
});

app.use("/user",user);

app.listen(3000,()=>{
console.log("API Started...");
console.log("API URL: http://localhost:3000");

});