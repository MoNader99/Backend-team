const mongoose = require("mongoose");
const Schema=mongoose.Schema;

var ImagesSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    height:{
        type:Number,
        required:true,
        //min and max to be determined later if any
    },
    width:{
        type:Number,
        required:true,
        //min and max to be determined later if any
    }
});

var images= mongoose.model('Images', ImagesSchema);
module.exports={images,ImagesSchema};