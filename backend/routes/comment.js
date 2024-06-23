const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const jwt = require("jsonwebtoken");
const verify = require("../verifytoken");
const verifytoken = require("../verifytoken");

 //create 
 router.post("/create" , verifytoken , async(req , res)=>{
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
 })

 //update
 router.put("/:id" , verifytoken , async(req , res)=>{
    try {
        const updatedComment =await Comment.findByIDAndUpdate(req.params.id, {$set:req.body},   {new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 //delete
 router.delete("/:id" , verifytoken , async(req , res)=>{
    try {
        const DelComment =await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json(DelComment)
    } catch (error) {
        res.status(500).json(error)
    }
 })     

 //fetching 

 router.get("/post/:postid"  , async(req , res)=>{
    try {
        const fetchedComment =await Comment.find({postid: req.params.postid})
        res.status(200).json(fetchedComment)
    } catch (error) {
        res.status(500).json(error)
    }
 }) 

 module.exports  = router ;