const mongoose = require("mongoose");
const Schema=mongoose.Schema;

var ImagesSchema = new mongoose.Schema({
   data:Buffer,
   contentType: String
});

var images= mongoose.model('Images', ImagesSchema);
module.exports={images,ImagesSchema};