var fs = require('fs');
const {ObjectID}=require('mongodb');
var { mongoose } = require("./db/mongoose.js");  
//THE DEFAULT IMAGE FILE WHERE DEFUALT IMAGE IS CREATED
var{images}= require("./models/images.js"); // images model



var defaultImagepath = "./Pictures/default.png";
var defaultImage = new images;
defaultImage.data = fs.readFileSync(defaultImagepath);
exports.defaultImage=defaultImage;  




