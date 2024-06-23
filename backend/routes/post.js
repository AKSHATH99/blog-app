const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("./post");
const Comment = require("../model/comments");
const jwt = require("jsonwebtoken");
const verify = require("../verifytoken");
const verifytoken = require("../verifytoken");

 //create 
 router.post("/create" , verifytoken , async(req , res)=>{
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
 })

 //update
 router.put("/:id" , verifytoken , async(req , res)=>{
    try {
        const updatedPost =await Post.findByIDAndUpdate(req.params.id, {$set:req.body},   {new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 //delete
 router.delete("/:id" , verifytoken , async(req , res)=>{
    try {
        const delPost =await Post.findByIdAndDelete(req.params.id)
        const delcomment = await Comment.deleteMany({postid:req.params.id})
        res.status(200).json(delPost)
    } catch (error) {
        res.status(500).json(error)
    }
 })     

 //fetching single post details
 router.get("/:id"  , async(req , res)=>{
    try {
        const post = await Post.findByID(req.params.id);
        res.status
       
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 //get post by searrh
 router.get("/"  , async(req , res)=>{
    try {
       const searchfilter =  {
        title : {$regex : express.query.search, $options : "i"}
       }
       const posts = await Post.find(express.query.search?searchfilter:null)
       res.status(200).json(posts)
       
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 //user specifc post 
 router.get("/user/:userID"  , async(req , res)=>{
    try {
       const post = await Post.find({userId: req.params.userID})
        res.status(200).json(posts)
       
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 module.exports  = router ;