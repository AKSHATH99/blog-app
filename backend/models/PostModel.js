const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        unique:true,
    },
    desc : {
        type:String,
        required:true,
        
    },
    photo : {
        type:String,
        required:true,
    },
    username : {
        type:String,
        required:true,
    
    },
    userID : {
        type:String,
        required:true,
    
    },
    category : {
        type:Array,
        required:true,
    
    },

},{timestamps:true})

module.exports = mongoose.model('Post',PostSchema);