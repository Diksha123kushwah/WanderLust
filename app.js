const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const mongooseUrl =  "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(mongooseUrl);
}
app.get("/",(req,res)=>{
    res.send("Hii this is working");
})
app.listen(8080,()=>{
    console.log("Listening");
})