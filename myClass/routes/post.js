const express = require("express");
const route = express.Router();

//get-posts
route.get("/",(req,res)=>{
    res.send("get req for posts");
})
//post-posts
route.get("/:id",(req,res)=>{
    res.send("post req for posts");
})
//new-posts
route.post("/new",(req,res)=>{
    res.send("newposts req for posts");
})
//delete-posts
route.delete("/:id",(req,res)=>{
    res.send("delete req for posts");
})

module.exports = route;