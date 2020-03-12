var mongoose= require("mongoose");
var user= mongoose.model('Users',{
    userName:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true

    },
    
    email:{
            type:String,
            required:true,
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
    isPremium:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxlength:1,
        enum:["M","F"],
    },
    birthDate:{
        type:Date,
        required:true,
        min: '1920-12-31',
        max: '2005-12-31'

    }

});

module.exports={user};