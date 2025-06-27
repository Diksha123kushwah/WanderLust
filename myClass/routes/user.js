const express = require("express");
const route = express.Router();

//get-user
route.get("/",(req,res)=>{
    res.send("get req for user");
})
//post-user
route.get("/:id",(req,res)=>{
    res.send("post req for user");
})
//new-user
route.post("/new",(req,res)=>{
    res.send("newuser req for user");
})
//delete-user
route.delete("/:id",(req,res)=>{
    res.send("delete req for user");
})

module.exports = route;