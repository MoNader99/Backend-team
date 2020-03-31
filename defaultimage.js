var fs = require('fs');
const {ObjectID}=require('mongodb');
var { mongoose } = require("./db/mongoose.js");  
//THE DEFAULT IMAGE FILE WHERE DEFUALT IMAGE IS CREATED
var{images}= require("./models/images.js"); // images model



var defaultImagepath = "./Pictures/default.png";
var defaultImage = new images;
defaultImage.data = fs.readFileSync(defaultImagepath);
defaultImage.contentType = 'png';
defaultImage.path=defaultImagepath;
exports.defaultImage=defaultImage;  


//// DEFAULT PICTURE OF THE USER
/*var imgPath4 = "./Pictures/defaultuser.png";    
var image4 = new images;
        image4.data = fs.readFileSync(imgPath4);
        image4.contentType = 'png';
        image4.path=imgPath4;  
exports.image4=image4; */