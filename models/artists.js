var mongoose= require("mongoose");
var artist=mongoose.model('Artists',{
    artistName: {
        type:String,
        required:true,
        minlength : 1 ,
        trim : true,
        unique:true 
    },
    email:{
        type:String,
        //required:true,
        trim:true,
        minlength:1, 
        unique : true
    },
    password:{
    type:String,
    required:true,
    trim:true,
    minlength:4,
    },
    about:{
        type:String,
        required:true,
        trim:true,
        minlength:100   
    },
    genres:[String],
    rating:{
        type:Number,
        default:-1   // artist is not yet rated by the users of our app
    }
    
});


module.exports={artist};